package service

import (
	"errors"
	"iotdash/backend/internal/core/domain"
	"iotdash/backend/internal/core/port"

	"github.com/google/uuid"
)

var _ port.ThermometerService = &ThermometerService{}

type ThermometerService struct {
	tmr port.ThermometerRepository
}

func NewThermometerService(tmr port.ThermometerRepository) *ThermometerService {
	return &ThermometerService{tmr: tmr}
}

func (s *ThermometerService) Create(tm *domain.Thermometer) error {
	return errors.New("not implemented")
}

func (s *ThermometerService) Update(tm *domain.Thermometer) error {
	return errors.New("not implemented")
}

func (s *ThermometerService) GetByID(id uuid.UUID) (*domain.Thermometer, error) {
	return nil, errors.New("not implemented")
}

func (s *ThermometerService) ListByUserID(userID uuid.UUID) ([]*domain.Thermometer, error) {
	return nil, errors.New("not implemented")
}
