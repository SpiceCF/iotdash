package thermoengine

import (
	"bytes"
	"encoding/json"
	"iotdash/backend/internal/core/domain"
	"math"
	"math/rand/v2"
	"net/http"
	"time"
)

type ThermoEngine struct {
	tm     *domain.Thermometer
	ticker *time.Ticker
}

func NewThermoEngine(tm *domain.Thermometer) *ThermoEngine {
	return &ThermoEngine{tm: tm}
}

func (te *ThermoEngine) StartSyncTemperature() {

	if te.ticker != nil {
		te.ticker.Stop()
	}

	te.ticker = time.NewTicker(1 * time.Second)
	go func() {
		for range te.ticker.C {
			changedTemperature := te.tm.Temperature + (rand.Float64() * 10.0) - 5.0
			te.tm.Temperature = math.Max(math.Min(changedTemperature, te.tm.Config.MaxTemperature), te.tm.Config.MinTemperature)
			te.tm.UpdatedAt = time.Now()
		}
	}()
}

func (te *ThermoEngine) StopSyncTemperature() {
	te.ticker.Stop()
}

func (te *ThermoEngine) GetThermometer() *domain.Thermometer {
	return te.tm
}

func (te *ThermoEngine) PushLog() error {
	json, err := json.Marshal(te.tm)
	if err != nil {
		return err
	}

	resp, err := http.Post(te.tm.Connection+"/api/v1/thermometer/log", "application/json", bytes.NewBuffer(json))
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	return nil
}
