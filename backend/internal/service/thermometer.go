package service

import (
	"iotdash/backend/internal/entity"
	"iotdash/backend/internal/repositories/sqlite"

	"github.com/google/uuid"
)

type IThermometerService interface {
	Create(ownerID uuid.UUID, config entity.ThermometerConfig) (*entity.Thermometer, error)
	Update(tm *entity.Thermometer) error
	GetByID(id uuid.UUID) (*entity.Thermometer, error)
	ListByOwnerID(ownerID uuid.UUID) ([]*entity.Thermometer, error)
	GetHistoryByThermometerID(id uuid.UUID) ([]*entity.ThermometerHistory, error)
	AddThermometerHistory(history *entity.ThermometerHistory) error
}

var _ IThermometerService = (*ThermometerService)(nil)

type ThermometerService struct {
	tmr sqlite.IThermometerRepository
}

func NewThermometerService(tmr sqlite.IThermometerRepository) *ThermometerService {
	return &ThermometerService{tmr: tmr}
}

func (s *ThermometerService) Create(ownerID uuid.UUID, config entity.ThermometerConfig) (*entity.Thermometer, error) {
	thermometer := &entity.Thermometer{
		OwnerID: ownerID,
		Config:  config,
	}

	err := s.tmr.Create(thermometer)
	if err != nil {
		return nil, err
	}

	return thermometer, nil
}

func (s *ThermometerService) Update(tm *entity.Thermometer) error {
	return s.tmr.Update(tm)
}

func (s *ThermometerService) GetByID(id uuid.UUID) (*entity.Thermometer, error) {
	return s.tmr.GetByID(id)
}

func (s *ThermometerService) ListByOwnerID(ownerID uuid.UUID) ([]*entity.Thermometer, error) {
	return s.tmr.ListByOwnerID(ownerID)
}

func (s *ThermometerService) GetHistoryByThermometerID(id uuid.UUID) ([]*entity.ThermometerHistory, error) {
	return s.tmr.GetHistoryByThermometerID(id)
}

func (s *ThermometerService) AddThermometerHistory(history *entity.ThermometerHistory) error {
	return s.tmr.AddThermometerHistory(history)
}
