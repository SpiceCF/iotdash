package port

import (
	"iotdash/backend/internal/core/domain"
	"iotdash/backend/pkg/thermoengine"

	"github.com/google/uuid"
)

type ThermometerRepository interface {
	Create(tm *domain.Thermometer) error
	Update(tm *domain.Thermometer) error
	GetByID(id uuid.UUID) (*domain.Thermometer, error)
	ListByOwnerID(ownerID uuid.UUID) ([]*domain.Thermometer, error)
	GetHistoryByThermometerID(id uuid.UUID) ([]*domain.ThermometerHistory, error)
	AddThermometerHistory(history *domain.ThermometerHistory) error
}

type ThermometerService interface {
	Create(ownerID uuid.UUID, config domain.ThermometerConfig) (*domain.Thermometer, error)
	Update(tm *domain.Thermometer) error
	GetByID(id uuid.UUID) (*domain.Thermometer, error)
	ListByOwnerID(ownerID uuid.UUID) ([]*domain.Thermometer, error)
	GetHistoryByThermometerID(id uuid.UUID) ([]*domain.ThermometerHistory, error)
	AddThermometerHistory(history *domain.ThermometerHistory) error
}

type ThermometerSimulatorService interface {
	LoadThermometers(thermometers []*domain.Thermometer) error
	GetEngine(id uuid.UUID) (*thermoengine.ThermoEngine, error)
	GetEngines() map[uuid.UUID]*thermoengine.ThermoEngine
	StartEngine(id uuid.UUID) error
	StopEngine(id uuid.UUID) error
	StartAllEngines() error
	StopAllEngines() error
}
