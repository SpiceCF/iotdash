package service

import (
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

func (s *ThermometerService) Create(ownerID uuid.UUID) (*domain.Thermometer, error) {
	thermometer := &domain.Thermometer{
		OwnerID: ownerID,
	}

	err := s.tmr.Create(thermometer)
	if err != nil {
		return nil, err
	}

	return thermometer, nil
}

func (s *ThermometerService) Update(tm *domain.Thermometer) error {
	return s.tmr.Update(tm)
}

func (s *ThermometerService) GetByID(id uuid.UUID) (*domain.Thermometer, error) {
	return s.tmr.GetByID(id)
}

func (s *ThermometerService) ListByOwnerID(ownerID uuid.UUID) ([]*domain.Thermometer, error) {
	return s.tmr.ListByOwnerID(ownerID)
}
