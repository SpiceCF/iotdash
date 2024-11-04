package main

import (
	"errors"
	"iotdash/backend/internal/adapter/handlers/restful"
	"iotdash/backend/internal/adapter/handlers/restful/authhandler"
	"iotdash/backend/internal/adapter/handlers/restful/sensorhandler"
	"iotdash/backend/internal/adapter/handlers/restful/simulatorhandler"
	"iotdash/backend/internal/adapter/handlers/restful/userhandler"
	"iotdash/backend/internal/adapter/repositories/sqlite"
	"iotdash/backend/internal/core/service"
	"iotdash/backend/pkg/zaplog"
	"net/http"
)

func main() {
	log, err := zaplog.NewLogger()
	if err != nil {
		panic(err)
	}

	// db, err := sqlite.NewDB(":memory:")
	db, err := sqlite.NewDB("./.cache/db.sqlite")
	if err != nil {
		panic(err)
	}

	thermometerRepository := sqlite.NewThermometerRepository(db)
	thermometerService := service.NewThermometerService(thermometerRepository)

	simulatorService := service.NewThermometerSimulatorService(thermometerService)

	userRepository := sqlite.NewUserRepository(db)
	userService := service.NewUserService(userRepository)
	authService := service.NewAuthService(userService)

	sensorRepository := sqlite.NewSensorRepository(db)
	sensorService := service.NewSensorService(sensorRepository)

	e := restful.NewServer(log, []restful.RouteHandler{
		authhandler.New(authService),
		simulatorhandler.New(simulatorService, thermometerService, authService),
		sensorhandler.New(sensorService, authService),
		userhandler.New(userService, authService),
	})

	log.Info("starting server on port 8080")
	if err = e.Start(":8080"); err != nil && !errors.Is(err, http.ErrServerClosed) {
		log.Fatal(err.Error())
	}
}
