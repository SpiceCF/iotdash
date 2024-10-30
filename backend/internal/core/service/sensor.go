package service

import (
	"iotdash/backend/internal/core/domain"
	"iotdash/backend/internal/core/port"

	"github.com/google/uuid"
)

var _ port.SensorService = (*SensorService)(nil)

type SensorService struct {
	sr port.SensorRepository
}

func NewSensorService(sr port.SensorRepository) *SensorService {
	return &SensorService{sr: sr}
}

func (s *SensorService) CreateSensor(sensor *domain.Sensor) error {
	return s.sr.CreateSensor(sensor)
}

func (s *SensorService) GetSensorByID(id uuid.UUID) (*domain.Sensor, error) {
	return s.sr.GetSensorByID(id)
}

func (s *SensorService) ListSensorsByUserID(userID uuid.UUID) ([]*domain.Sensor, error) {
	return s.sr.ListSensorsByUserID(userID)
}

func (s *SensorService) CreateSensorLog(sensorLog *domain.SensorLog) error {
	return s.sr.CreateSensorLog(sensorLog)
}

func (s *SensorService) ListSensorLogs(sensorID uuid.UUID) ([]*domain.SensorLog, error) {
	return s.sr.ListSensorLogs(sensorID)
}
