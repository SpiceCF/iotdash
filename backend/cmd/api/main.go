package main

import (
	"fmt"
	"iotdash/backend/internal/app/repositories/sqlite"
	"iotdash/backend/internal/core/domain"
	"iotdash/backend/internal/core/service"
	"time"

	"github.com/google/uuid"
)

func main() {
	db, err := sqlite.NewDB(":memory:")
	if err != nil {
		panic(err)
	}

	tmr := sqlite.NewThermometerRepository(db)

	tmr.Create(&domain.Thermometer{
		ID:          uuid.New(),
		OwnerID:     uuid.New(),
		IPAddress:   "192.168.1.100",
		Connection:  "http://localhost:8080",
		Temperature: 35,
		Config: domain.ThermometerConfig{
			MinTemperature: 0,
			MaxTemperature: 100,
		},
	})
}

func simulateThermometer() {
	tmes := service.NewThermometerSimulatorService()

	for i := 100; i < 110; i++ {
		tmes.LoadThermometers([]*domain.Thermometer{
			{
				ID:          uuid.New(),
				IPAddress:   fmt.Sprintf("192.168.1.%d", i),
				Connection:  "http://localhost:8080",
				Temperature: 35,
				Config: domain.ThermometerConfig{
					MinTemperature: 0,
					MaxTemperature: 100,
				},
			},
		})
	}

	engines := tmes.GetEngines()
	tmes.StartAllEngines()

	for {
		time.Sleep(1 * time.Second)
		for _, engine := range engines {
			tm := engine.GetThermometer()
			fmt.Printf("%s: %.2f\n", tm.IPAddress, tm.Temperature)
		}
	}
}
