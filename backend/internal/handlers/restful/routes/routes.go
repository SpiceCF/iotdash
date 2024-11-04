package routes

import (
	"iotdash/backend/internal/handlers/restful/routes/auth"
	"iotdash/backend/internal/handlers/restful/routes/sensor"
	"iotdash/backend/internal/handlers/restful/routes/simulator"
	"iotdash/backend/internal/handlers/restful/routes/user"
	"iotdash/backend/internal/service"
)

type Routes struct {
	Auth      *auth.RouteHandler
	Simulator *simulator.RouteHandler
	Sensor    *sensor.RouteHandler
	User      *user.RouteHandler
}

type RouteDependencies struct {
	AuthService        service.IAuthService
	SimulatorService   service.IThermometerSimulatorService
	ThermometerService service.IThermometerService
	SensorService      service.ISensorService
	UserService        service.IUserService
}

func NewRoutes(deps *RouteDependencies) *Routes {
	return &Routes{
		Auth:      auth.New(deps.AuthService),
		Simulator: simulator.New(deps.SimulatorService, deps.ThermometerService, deps.AuthService),
		Sensor:    sensor.New(deps.SensorService, deps.AuthService),
		User:      user.New(deps.UserService, deps.AuthService),
	}
}
