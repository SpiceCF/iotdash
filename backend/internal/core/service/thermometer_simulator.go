package service

import (
	"errors"
	"iotdash/backend/internal/core/domain"
	"iotdash/backend/internal/core/port"
	"iotdash/backend/pkg/thermoengine"

	"github.com/google/uuid"
)

var _ port.ThermometerSimulatorService = &ThermometerSimulatorService{}

type ThermometerSimulatorService struct {
	engines map[uuid.UUID]*thermoengine.ThermoEngine
}

func NewThermometerSimulatorService() *ThermometerSimulatorService {
	return &ThermometerSimulatorService{
		engines: make(map[uuid.UUID]*thermoengine.ThermoEngine),
	}
}

func (s *ThermometerSimulatorService) LoadThermometers(thermometers []*domain.Thermometer) error {
	for _, tm := range thermometers {
		te := thermoengine.NewThermoEngine(tm)
		s.engines[tm.ID] = te
	}

	return nil
}

func (s *ThermometerSimulatorService) StartEngine(id uuid.UUID) error {
	engine, ok := s.engines[id]
	if !ok {
		return errors.New("engine not found")
	}
	engine.StartSyncTemperature()

	return nil
}

func (s *ThermometerSimulatorService) StopEngine(id uuid.UUID) error {
	engine, ok := s.engines[id]
	if !ok {
		return errors.New("engine not found")
	}
	engine.StopSyncTemperature()

	return nil
}

func (s *ThermometerSimulatorService) StartAllEngines() error {
	for _, engine := range s.engines {
		engine.StartSyncTemperature()
	}

	return nil
}

func (s *ThermometerSimulatorService) StopAllEngines() error {
	for _, engine := range s.engines {
		engine.StopSyncTemperature()
	}

	return nil
}

func (s *ThermometerSimulatorService) GetEngine(id uuid.UUID) (*thermoengine.ThermoEngine, error) {
	engine, ok := s.engines[id]
	if !ok {
		return nil, errors.New("engine not found")
	}
	return engine, nil
}

func (s *ThermometerSimulatorService) GetEngines() map[uuid.UUID]*thermoengine.ThermoEngine {
	return s.engines
}