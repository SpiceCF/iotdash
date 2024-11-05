package service

import (
	"errors"
	"iotdash/backend/internal/entity"
	"iotdash/backend/pkg/thermoengine"
	"log"
	"time"

	"github.com/google/uuid"
)

var engineInstances map[uuid.UUID]*thermoengine.ThermoEngine = make(map[uuid.UUID]*thermoengine.ThermoEngine)

var _ thermoengine.EngineMonitor = (*SimulatorEngineMonitor)(nil)

type IThermometerSimulatorService interface {
	LoadThermometers(thermometers []*entity.Thermometer) error
	GetEngine(id uuid.UUID) (*thermoengine.ThermoEngine, error)
	GetEngines() map[uuid.UUID]*thermoengine.ThermoEngine
	StartEngine(id uuid.UUID) error
	StopEngine(id uuid.UUID) error
	StartAllEngines() error
	StopAllEngines() error
}

type SimulatorEngineMonitor struct {
	ts IThermometerService
}

func (s *SimulatorEngineMonitor) OnTemperatureChange(tm *entity.Thermometer) {
	err := s.ts.AddThermometerHistory(&entity.ThermometerHistory{
		ThermometerID: tm.ID,
		Temperature:   tm.Temperature,
		Timestamp:     time.Now(),
	})
	if err != nil {
		log.Println(err)
	}
}

var _ IThermometerSimulatorService = (*ThermometerSimulatorService)(nil)

type ThermometerSimulatorService struct {
	engines map[uuid.UUID]*thermoengine.ThermoEngine
	em      *SimulatorEngineMonitor
}

func NewThermometerSimulatorService(ts IThermometerService) *ThermometerSimulatorService {
	return &ThermometerSimulatorService{
		engines: engineInstances,
		em: &SimulatorEngineMonitor{
			ts: ts,
		},
	}
}

func (s *ThermometerSimulatorService) LoadThermometers(thermometers []*entity.Thermometer) error {
	for _, tm := range thermometers {
		te := thermoengine.NewThermoEngine(tm)
		te.SetMonitor(s.em)
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
