package sensorhandler

import (
	"fmt"
	"iotdash/backend/internal/adapter/handlers"
	"iotdash/backend/internal/core/domain"
	"iotdash/backend/internal/core/port"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/zc2638/swag"
	"github.com/zc2638/swag/endpoint"
	"go.uber.org/zap"
)

var _ handlers.EchoRouteHandler = (*SensorHandler)(nil)

type SensorHandler struct {
	log         *zap.Logger
	sns         port.SensorService
	middlewares *handlers.EchoMiddlewares
}

func New(sns port.SensorService, aus port.AuthService) *SensorHandler {
	middlewares := handlers.NewEchoMiddlewares(aus)
	return &SensorHandler{sns: sns, middlewares: middlewares}
}

func (h *SensorHandler) SetupLogger(log *zap.Logger) {
	h.log = log
}

func (h *SensorHandler) RegisterRoutes(e *echo.Group, api *swag.API) {
	rg := e.Group("/sensors")
	rg.GET("", h.listSensors, h.middlewares.VerifyTokenMiddleware())
	rg.POST("", h.createSensor, h.middlewares.VerifyTokenMiddleware())
	rg.GET("/:id/logs", h.listSensorLogs, h.middlewares.VerifyTokenMiddleware())
	rg.POST(
		fmt.Sprintf("/%s/logs", domain.SensorTypeThermometer),
		h.createThermometerLog(),
	)

	ag := api.WithGroup("/sensors")
	ag.AddEndpoint(
		endpoint.New(
			http.MethodGet, "/",
			endpoint.Tags("Sensor"),
			endpoint.Summary("List sensors"),
			endpoint.OperationID("listSensors"),
			endpoint.Description("List sensors"),
			endpoint.Response(http.StatusOK, "ListSensorsResponse", endpoint.SchemaResponseOption(new(ListSensorsResponse))),
		),
		endpoint.New(
			http.MethodPost, "/",
			endpoint.Tags("Sensor"),
			endpoint.Summary("Create sensor"),
			endpoint.OperationID("createSensor"),
			endpoint.Description("Create sensor"),
			endpoint.Body(new(CreateSensorRequest), "CreateSensorRequest", true),
			endpoint.Response(http.StatusOK, "CreateSensorResponse", endpoint.SchemaResponseOption(new(CreateSensorResponse))),
		),
		endpoint.New(
			http.MethodGet, "/{id}/logs",
			endpoint.Tags("Sensor"),
			endpoint.Summary("List sensor logs"),
			endpoint.OperationID("listSensorLogs"),
			endpoint.Description("List sensor logs"),
			endpoint.Path("id", "string", "Sensor ID", true),
			endpoint.Response(
				http.StatusOK,
				"ListSensorLogsResponse",
				endpoint.SchemaResponseOption(new(ListSensorLogsResponse)),
			),
		),
		endpoint.New(
			http.MethodPost, fmt.Sprintf("/%s/logs", domain.SensorTypeThermometer),
			endpoint.Tags("Sensor"),
			endpoint.Summary("Create thermometer log"),
			endpoint.OperationID("createThermometerLog"),
			endpoint.Description("Create thermometer log"),
			endpoint.Body(new(CreateThermometerLogRequest), "CreateSensorLogRequest", true),
			endpoint.Response(
				http.StatusOK,
				"CreateSensorLogResponse",
				endpoint.SchemaResponseOption(new(CreateThermometerLogResponse)),
			),
		),
	)
}
