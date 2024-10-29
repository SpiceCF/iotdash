package thermoengine

import (
	"crypto/rand"
	"iotdash/backend/internal/core/domain"
	"log"
	"math"
	"math/big"
	"time"

	"github.com/go-resty/resty/v2"
)

const temperatureAdjustmentFactor = 10
const temperatureOffset = 5
const adjustmentMultiplier = 100

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
			randomInt, err := rand.Int(rand.Reader, big.NewInt(temperatureAdjustmentFactor*adjustmentMultiplier))
			if err != nil {
				log.Println(err)
				return
			}
			randomFloat := float64(randomInt.Int64()) / float64(adjustmentMultiplier)
			changedTemperature := te.tm.Temperature + randomFloat - float64(temperatureOffset)
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
		Timestamp:  te.tm.UpdatedAt,
	}

	_, err := te.rc.R().
		SetBody(sLog).
		Post(te.tm.Config.Connection)

	if err != nil {
		return err
	}

	return nil
}
