package sensor

import (
	"fmt"
	"iotdash/backend/internal/entity"
	"iotdash/backend/internal/handlers/restful"
	"iotdash/backend/internal/service"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/zc2638/swag"
	"github.com/zc2638/swag/endpoint"
	"go.uber.org/zap"
)

var _ restful.RouteHandler = (*RouteHandler)(nil)

type RouteHandler struct {
	log         *zap.Logger
	sns         service.ISensorService
	middlewares *restful.RouteMiddlewares
}

func New(sns service.ISensorService, aus service.IAuthService) *RouteHandler {
	middlewares := restful.NewRouteMiddlewares(aus)
	return &RouteHandler{sns: sns, middlewares: middlewares}
}

func (h *RouteHandler) SetupLogger(log *zap.Logger) {
	h.log = log
}

func (h *RouteHandler) RegisterRoutes(e *echo.Group, api *swag.API) {
	rg := e.Group("/sensors")
	rg.GET("", h.listSensors, h.middlewares.VerifyTokenMiddleware())
	rg.POST("", h.createSensor, h.middlewares.VerifyTokenMiddleware())
	rg.GET("/:id/logs", h.listSensorLogs, h.middlewares.VerifyTokenMiddleware())
	rg.GET("/:id/logs/metric", h.listSensorMetricLogs, h.middlewares.VerifyTokenMiddleware())
	rg.POST(
		fmt.Sprintf("/%s/logs", entity.SensorTypeThermometer),
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
			http.MethodGet, "/{id}/logs/metric",
			endpoint.Tags("Sensor"),
			endpoint.Summary("List sensor metric logs"),
			endpoint.OperationID("listSensorMetricLogs"),
			endpoint.Description("List sensor metric logs"),
			endpoint.Path("id", "string", "Sensor ID", true),
			endpoint.Query("key", "string", "Metric key ex. temperature, humidity", true),
			endpoint.Query("from", "string", "From timestamp with format RFC3339", true),
			endpoint.Query("to", "string", "To timestamp with format RFC3339", true),
			endpoint.Query("interval", "string", "Interval (day, hour, minute)", true),
			endpoint.Response(
				http.StatusOK,
				"ListSensorMetricLogsResponse",
				endpoint.SchemaResponseOption(new(ListSensorMetricLogsResponse)),
			),
		),
		endpoint.New(
			http.MethodPost, fmt.Sprintf("/%s/logs", entity.SensorTypeThermometer),
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
