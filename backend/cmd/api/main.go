package main

import (
	"fmt"
	"iotdash/backend/internal/core/domain"
	"iotdash/backend/internal/core/service"
	"time"

	"github.com/google/uuid"
)

func main() {

	tmes := service.NewThermometerSimulatorService()

	for i := 100; i < 110; i++ {
		tmes.LoadThermometers([]*domain.Thermometer{
			{
				ID:                 uuid.New(),
				IPAddress:          fmt.Sprintf("192.168.1.%d", i),
				Connection:         "http://localhost:8080",
				CurrentTemperature: 35,
				MinTemperature:     0,
				MaxTemperature:     100,
			},
		})
	}

	engines := tmes.GetEngines()
	tmes.StartAllEngines()

	for {
		for _, engine := range engines {
			tm := engine.GetThermometer()
			fmt.Printf("%s: %.2f\n", tm.IPAddress, tm.CurrentTemperature)
		}
		time.Sleep(1 * time.Second)
	}
}
