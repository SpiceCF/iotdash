package main

import (
	"errors"
	"iotdash/backend/internal/handlers/restful"
	"iotdash/backend/internal/handlers/restful/routes"
	"iotdash/backend/internal/repositories/sqlite"
	"iotdash/backend/internal/service"
	"iotdash/backend/pkg/zaplog"
	"net/http"
)

func main() {
	log, err := zaplog.NewLogger()
	if err != nil {
		panic(err)
	}

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

	routes := routes.NewRoutes(&routes.RouteDependencies{
		AuthService:        authService,
		SimulatorService:   simulatorService,
		ThermometerService: thermometerService,
		SensorService:      sensorService,
		UserService:        userService,
	})

	e := restful.NewServer(log, []restful.RouteHandler{
		routes.Auth,
		routes.Simulator,
		routes.Sensor,
		routes.User,
	})

	log.Info("starting server on port 8080")
	if err = e.Start(":8080"); err != nil && !errors.Is(err, http.ErrServerClosed) {
		log.Fatal(err.Error())
	}
}
