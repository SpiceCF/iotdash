package port

import (
	"iotdash/backend/internal/core/domain"

	"github.com/google/uuid"
)

type SensorRepository interface {
	CreateSensor(sensor *domain.Sensor) error
	GetSensorByID(id uuid.UUID) (*domain.Sensor, error)
	ListSensorsByUserID(userID uuid.UUID) ([]*domain.Sensor, error)
	CreateSensorLog(sensorLog *domain.SensorLog) error
	ListSensorLogs(deviceID uuid.UUID) ([]*domain.SensorLog, error)
}

type SensorService interface {
	CreateSensor(sensor *domain.Sensor) error
	GetSensorByID(id uuid.UUID) (*domain.Sensor, error)
	ListSensorsByUserID(userID uuid.UUID) ([]*domain.Sensor, error)
	CreateSensorLog(sensorLog *domain.SensorLog) error
	ListSensorLogs(deviceID uuid.UUID) ([]*domain.SensorLog, error)
}
