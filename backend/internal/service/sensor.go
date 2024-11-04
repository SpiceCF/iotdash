package service

import (
	"iotdash/backend/internal/entity"
	"iotdash/backend/internal/repositories/sqlite"

	"github.com/google/uuid"
)

type ISensorService interface {
	CreateSensor(sensor *entity.Sensor) error
	GetSensorByID(id uuid.UUID) (*entity.Sensor, error)
	ListSensorsByUserID(userID uuid.UUID) ([]*entity.Sensor, error)
	CreateSensorLog(sensorLog *entity.SensorLog) error
	ListSensorLogs(deviceID uuid.UUID) ([]*entity.SensorLog, error)
}

var _ ISensorService = (*SensorService)(nil)

type SensorService struct {
	sr sqlite.ISensorRepository
}

func NewSensorService(sr sqlite.ISensorRepository) *SensorService {
	return &SensorService{sr: sr}
}

func (s *SensorService) CreateSensor(sensor *entity.Sensor) error {
	return s.sr.CreateSensor(sensor)
}

func (s *SensorService) GetSensorByID(id uuid.UUID) (*entity.Sensor, error) {
	return s.sr.GetSensorByID(id)
}

func (s *SensorService) ListSensorsByUserID(userID uuid.UUID) ([]*entity.Sensor, error) {
	return s.sr.ListSensorsByUserID(userID)
}

func (s *SensorService) CreateSensorLog(sensorLog *entity.SensorLog) error {
	return s.sr.CreateSensorLog(sensorLog)
}

func (s *SensorService) ListSensorLogs(sensorID uuid.UUID) ([]*entity.SensorLog, error) {
	return s.sr.ListSensorLogs(sensorID)
}
