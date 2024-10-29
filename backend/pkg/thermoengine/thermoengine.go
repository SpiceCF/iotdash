package thermoengine

import (
	"crypto/rand"
	"encoding/binary"
	"iotdash/backend/internal/core/domain"
	"log"
	"math"
	"time"

	"github.com/go-resty/resty/v2"
)

const temperatureAdjustmentFactor = 10.0
const temperatureOffset = 5.0

type ThermoEngine struct {
	tm     *domain.Thermometer
	ticker *time.Ticker
	rc     *resty.Client
}

func NewThermoEngine(tm *domain.Thermometer) *ThermoEngine {
	client := resty.New()

	return &ThermoEngine{tm: tm, rc: client}
}

func (te *ThermoEngine) StartSyncTemperature() {
	if te.ticker != nil {
		te.ticker.Stop()
	}

	te.ticker = time.NewTicker(1 * time.Second)
	go func() {
		defer te.ticker.Stop()
		for range te.ticker.C {
			var randomValue float64
			err := binary.Read(rand.Reader, binary.LittleEndian, &randomValue)
			if err != nil {
				log.Println(err)
				return
			}
			changedTemperature := te.tm.Temperature + (randomValue * temperatureAdjustmentFactor) - temperatureOffset
			te.tm.Temperature = math.Max(math.Min(changedTemperature, te.tm.Config.MaxTemperature), te.tm.Config.MinTemperature)
			te.tm.UpdatedAt = time.Now()
			err = te.PushLog()
			if err != nil {
				te.tm.Connected = false
				log.Println(err)
				return
			}
			if !te.tm.Connected {
				te.tm.Connected = true
			}
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
	sLog := &domain.SensorLog{
		DeviceID:   te.tm.ID,
		SensorType: domain.SensorTypeThermometer,
		Key:        "temperature",
		Value:      te.tm.Temperature,
		Timestamp:  time.Now(),
	}

	_, err := te.rc.R().
		SetBody(sLog).
		Post(te.tm.Config.Connection)

	if err != nil {
		return err
	}

	return nil
}
