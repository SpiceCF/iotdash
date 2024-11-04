package sqlite

import (
	"iotdash/backend/internal/entity"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type ISensorRepository interface {
	CreateSensor(sensor *entity.Sensor) error
	GetSensorByID(id uuid.UUID) (*entity.Sensor, error)
	ListSensorsByUserID(userID uuid.UUID) ([]*entity.Sensor, error)
	CreateSensorLog(sensorLog *entity.SensorLog) error
	ListSensorLogs(deviceID uuid.UUID) ([]*entity.SensorLog, error)
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
