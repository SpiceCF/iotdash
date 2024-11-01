package sqlite

import (
	"iotdash/backend/internal/core/domain"
	"iotdash/backend/internal/core/port"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

var _ port.SensorRepository = (*SensorRepository)(nil)

type SensorRepository struct {
	db *gorm.DB
}

func NewSensorRepository(db *gorm.DB) *SensorRepository {
	return &SensorRepository{db: db}
}

func (sr *SensorRepository) CreateSensor(sensor *domain.Sensor) error {
	return sr.db.Create(sensor).Error
}

func (sr *SensorRepository) GetSensorByID(id uuid.UUID) (*domain.Sensor, error) {
	var sensor domain.Sensor
	return &sensor, sr.db.Where(&domain.Sensor{ID: id}).First(&sensor).Error
}

func (sr *SensorRepository) ListSensorsByUserID(userID uuid.UUID) ([]*domain.Sensor, error) {
	var sensors []*domain.Sensor
	return sensors, sr.db.Where(&domain.Sensor{OwnerID: userID}).Find(&sensors).Error
}

func (sr *SensorRepository) CreateSensorLog(sensorLog *domain.SensorLog) error {
	return sr.db.Create(sensorLog).Error
}

const logLimit = 50

func (sr *SensorRepository) ListSensorLogs(deviceID uuid.UUID) ([]*domain.SensorLog, error) {
	var sensorLogs []*domain.SensorLog
	return sensorLogs, sr.db.Where(&domain.SensorLog{DeviceID: deviceID}).
		Order("timestamp desc").
		Limit(logLimit).
		Find(&sensorLogs).
		Error
}
