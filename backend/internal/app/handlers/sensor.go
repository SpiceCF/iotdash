package handlers

import (
	"iotdash/backend/internal/core/port"

	"github.com/labstack/echo/v4"
	"go.uber.org/zap"
)

var _ EchoRouteHandler = &SensorHandler{}

type SensorHandler struct {
	log         *zap.Logger
	sns         port.SensorService
	middlewares *EchoMiddlewares
}

func NewSensorHandler(sns port.SensorService, aus port.AuthService) *SensorHandler {
	middlewares := NewEchoMiddlewares(aus)
	return &SensorHandler{sns: sns, middlewares: middlewares}
}

func (h *SensorHandler) SetupLogger(log *zap.Logger) {
	h.log = log
}

func (h *SensorHandler) RegisterRoutes(e *echo.Group) {
	rg := e.Group("/sensors")
	rg.GET("/", h.getSensors, h.middlewares.VerifyTokenMiddleware())
}

func (h *SensorHandler) getSensors(c echo.Context) error {
	return nil
}
