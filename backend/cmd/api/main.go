package main

import (
	"fmt"
	"iotdash/backend/internal/app/handlers"
	"iotdash/backend/internal/app/repositories/sqlite"
	"iotdash/backend/internal/core/domain"
	"iotdash/backend/internal/core/service"
	"iotdash/backend/pkg/zaplog"
	"net/http"
	"time"

	"github.com/google/uuid"
)

func main() {
	apiStart()
}

func apiStart() {
	log, err := zaplog.NewLogger()
	if err != nil {
		panic(err)
	}

	db, err := sqlite.NewDB(":memory:")
	if err != nil {
		panic(err)
	}

	userRepository := sqlite.NewUserRepository(db)
	userService := service.NewUserService(userRepository)
	userHandler := handlers.NewUserHandler(userService)
	e := handlers.NewEcho(log, []handlers.EchoRouteHandler{
		userHandler,
	})

	log.Info("starting server on port 8080")
	if err := e.Start(":8080"); err != http.ErrServerClosed {
		log.Fatal(err.Error())
	}
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
