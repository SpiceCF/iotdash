package thermoengine

import (
	"crypto/rand"
	"fmt"
	"iotdash/backend/internal/entity"
	"log"
	"math"
	"math/big"
	"strconv"
	"time"

	"github.com/go-resty/resty/v2"
)

const temperatureAdjustmentFactor = 10
const temperatureOffset = 5
const adjustmentMultiplier = 100

type EngineMonitor interface {
	OnTemperatureChange(tm *entity.Thermometer)
}

var _ EngineMonitor = (*defaultEngineMonitor)(nil)

type defaultEngineMonitor struct{}

func (d *defaultEngineMonitor) OnTemperatureChange(_ *entity.Thermometer) {}

type ThermoEngine struct {
	tm     *entity.Thermometer
	ticker *time.Ticker
	m      EngineMonitor
	rc     *resty.Client
}

func NewThermoEngine(tm *entity.Thermometer) *ThermoEngine {
	client := resty.New()

	return &ThermoEngine{tm: tm, rc: client, m: &defaultEngineMonitor{}}
}

func (te *ThermoEngine) SetMonitor(m EngineMonitor) {
	te.m = m
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
			randomTemp := math.Max(math.Min(changedTemperature, te.tm.Config.MaxTemperature), te.tm.Config.MinTemperature)
			te.tm.Temperature, err = strconv.ParseFloat(fmt.Sprintf("%.2f", randomTemp), 64)
			if err != nil {
				log.Println(err)
				return
			}
			te.tm.UpdatedAt = time.Now()
			te.m.OnTemperatureChange(te.tm)
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

func (te *ThermoEngine) GetThermometer() *entity.Thermometer {
	return te.tm
}

func (te *ThermoEngine) PushLog() error {
	sLog := &entity.SensorLog{
		DeviceID:   te.tm.ID,
		SensorType: entity.SensorTypeThermometer,
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
