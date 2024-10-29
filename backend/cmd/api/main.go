package main

import (
	"iotdash/backend/internal/app/handlers"
	"iotdash/backend/internal/app/repositories/sqlite"
	"iotdash/backend/internal/core/service"
	"iotdash/backend/pkg/zaplog"
	"net/http"
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

	thermometerRepository := sqlite.NewThermometerRepository(db)
	thermometerService := service.NewThermometerService(thermometerRepository)

	simulatorService := service.NewThermometerSimulatorService()

	userRepository := sqlite.NewUserRepository(db)
	userService := service.NewUserService(userRepository)
	authService := service.NewAuthService(userService)

	sensorRepository := sqlite.NewSensorRepository(db)
	sensorService := service.NewSensorService(sensorRepository)

	e := handlers.NewEcho(log, []handlers.EchoRouteHandler{
		handlers.NewAuthHandler(authService),
		handlers.NewSimulatorHandler(simulatorService, thermometerService, authService),
		handlers.NewSensorHandler(sensorService, authService),
		handlers.NewUserHandler(userService, authService),
	})

	log.Info("starting server on port 8080")
	if err := e.Start(":8080"); err != http.ErrServerClosed {
		log.Fatal(err.Error())
	}
}
