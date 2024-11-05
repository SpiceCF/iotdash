package sqlite

import (
	"database/sql"
	"fmt"
	"iotdash/backend/internal/entity"
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type TimeSeries struct {
	Key       string    `gorm:"column:key" json:"key" example:"temperature"`
	Timestamp time.Time `gorm:"column:log_date" json:"timestamp" example:"2024-11-05T00:00:00Z"`
	Value     float64   `gorm:"column:value" json:"value" example:"25.5"`
}

type TimeSerieInterval string

const (
	IntervalMinute TimeSerieInterval = "minute"
	IntervalHour   TimeSerieInterval = "hour"
	IntervalDay    TimeSerieInterval = "day"
	IntervalMonth  TimeSerieInterval = "month"
	IntervalYear   TimeSerieInterval = "year"
)

type ISensorRepository interface {
	CreateSensor(sensor *entity.Sensor) error
	GetSensorByID(id uuid.UUID) (*entity.Sensor, error)
	ListSensorsByUserID(userID uuid.UUID) ([]*entity.Sensor, error)
	CreateSensorLog(sensorLog *entity.SensorLog) error
	ListSensorLogs(deviceID uuid.UUID) ([]*entity.SensorLog, error)
	GetAvgSensorLogs(
		deviceID uuid.UUID,
		key string,
		from time.Time,
		to time.Time,
		interval TimeSerieInterval,
	) ([]*TimeSeries, error)
	GetMinSensorLogs(
		deviceID uuid.UUID,
		key string,
		from time.Time,
		to time.Time,
		interval TimeSerieInterval,
	) ([]*TimeSeries, error)
	GetMaxSensorLogs(
		deviceID uuid.UUID,
		key string,
		from time.Time,
		to time.Time,
		interval TimeSerieInterval,
	) ([]*TimeSeries, error)
}

var _ ISensorRepository = (*SensorRepository)(nil)

type SensorRepository struct {
	db *gorm.DB
}

func NewSensorRepository(db *gorm.DB) *SensorRepository {
	return &SensorRepository{db: db}
}

func (sr *SensorRepository) CreateSensor(sensor *entity.Sensor) error {
	return sr.db.Create(sensor).Error
}

func (sr *SensorRepository) GetSensorByID(id uuid.UUID) (*entity.Sensor, error) {
	var sensor entity.Sensor
	return &sensor, sr.db.Where(&entity.Sensor{ID: id}).First(&sensor).Error
}

func (sr *SensorRepository) ListSensorsByUserID(userID uuid.UUID) ([]*entity.Sensor, error) {
	var sensors []*entity.Sensor
	return sensors, sr.db.Where(&entity.Sensor{OwnerID: userID}).Find(&sensors).Error
}

func (sr *SensorRepository) CreateSensorLog(sensorLog *entity.SensorLog) error {
	return sr.db.Create(sensorLog).Error
}

const logLimit = 50

func (sr *SensorRepository) ListSensorLogs(deviceID uuid.UUID) ([]*entity.SensorLog, error) {
	var sensorLogs []*entity.SensorLog
	return sensorLogs, sr.db.Where(&entity.SensorLog{DeviceID: deviceID}).
		Order("timestamp desc").
		Limit(logLimit).
		Find(&sensorLogs).
		Error
}

func (sr *SensorRepository) getIntervalGrouping(interval TimeSerieInterval) string {
	var grouping string

	switch interval {
	case IntervalMinute:
		grouping = "STRFTIME('%Y-%m-%dT%H:%M:00Z', timestamp)"
	case IntervalHour:
		grouping = "STRFTIME('%Y-%m-%dT%H:00:00Z', timestamp)"
	case IntervalDay:
		grouping = "STRFTIME('%Y-%m-%dT00:00:00Z', timestamp)"
	case IntervalMonth:
		grouping = "STRFTIME('%Y-%m-01T00:00:00Z', timestamp)"
	case IntervalYear:
		grouping = "STRFTIME('%Y-01-01T00:00:00Z', timestamp)"
	default:
		panic(fmt.Sprintf("unknown interval: %s", interval))
	}

	return grouping
}

func (sr *SensorRepository) readTimeSeriesRows(rows *sql.Rows) ([]*TimeSeries, error) {
	var avgs []*TimeSeries
	for rows.Next() {
		var avg TimeSeries
		var row struct {
			Key       string  `gorm:"column:key"`
			Timestamp string  `gorm:"column:log_date"`
			Value     float64 `gorm:"column:value"`
		}
		err := rows.Scan(&row.Key, &row.Timestamp, &row.Value)

		if err != nil {
			return nil, err
		}
		avg.Key = row.Key
		avg.Timestamp, err = time.Parse(time.RFC3339, row.Timestamp)

		if err != nil {
			return nil, err
		}

		avg.Value = row.Value
		avgs = append(avgs, &avg)
	}

	return avgs, nil
}

func (sr *SensorRepository) GetAvgSensorLogs(
	deviceID uuid.UUID,
	key string,
	from time.Time,
	to time.Time,
	interval TimeSerieInterval,
) ([]*TimeSeries, error) {
	var avgs []*TimeSeries
	grouping := sr.getIntervalGrouping(interval)

	rows, err := sr.db.Raw(
		fmt.Sprintf(`
		SELECT 
			key,
			%s as log_date,
			printf('%%.2f', avg(value)) as value
		FROM sensor_logs
		WHERE device_id = ? AND key = ? AND timestamp BETWEEN ? AND ?
		GROUP BY 	
			log_date
		ORDER BY log_date DESC
		LIMIT 10;
		`, grouping),
		deviceID, key, from, to,
	).Rows()
	if err != nil {
		return nil, err
	}

	avgs, err = sr.readTimeSeriesRows(rows)
	if err != nil {
		return nil, err
	}

	return avgs, nil
}

func (sr *SensorRepository) GetMinSensorLogs(
	deviceID uuid.UUID,
	key string,
	from time.Time,
	to time.Time,
	interval TimeSerieInterval,
) ([]*TimeSeries, error) {
	var avgs []*TimeSeries
	grouping := sr.getIntervalGrouping(interval)

	rows, err := sr.db.Raw(
		fmt.Sprintf(`
		SELECT 
			key,
			%s as log_date,
			printf('%%.2f', min(value)) as value
		FROM sensor_logs
		WHERE device_id = ? AND key = ? AND timestamp BETWEEN ? AND ?
		GROUP BY 	
			log_date
		ORDER BY log_date DESC
		LIMIT 10;
		`, grouping),
		deviceID, key, from, to,
	).Rows()
	if err != nil {
		return nil, err
	}

	avgs, err = sr.readTimeSeriesRows(rows)
	if err != nil {
		return nil, err
	}

	return avgs, nil
}

func (sr *SensorRepository) GetMaxSensorLogs(
	deviceID uuid.UUID,
	key string,
	from time.Time,
	to time.Time,
	interval TimeSerieInterval,
) ([]*TimeSeries, error) {
	var avgs []*TimeSeries
	grouping := sr.getIntervalGrouping(interval)

	rows, err := sr.db.Raw(
		fmt.Sprintf(`
		SELECT 
			key,
			%s as log_date,
			printf('%%.2f', max(value)) as value
		FROM sensor_logs
		WHERE device_id = ? AND key = ? AND timestamp BETWEEN ? AND ?
		GROUP BY 	
			log_date
		ORDER BY log_date DESC
		LIMIT 10;
		`, grouping),
		deviceID, key, from, to,
	).Rows()
	if err != nil {
		return nil, err
	}

	avgs, err = sr.readTimeSeriesRows(rows)
	if err != nil {
		return nil, err
	}

	return avgs, nil
}
