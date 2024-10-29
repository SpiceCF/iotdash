package simulatorhandler

import (
	"iotdash/backend/internal/app/handlers"
	"iotdash/backend/internal/core/port"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/zc2638/swag"
	"github.com/zc2638/swag/endpoint"
	"go.uber.org/zap"
)

var _ handlers.EchoRouteHandler = &SimulatorHandler{}

type SimulatorHandler struct {
	log         *zap.Logger
	middlewares *handlers.EchoMiddlewares
	tss         port.ThermometerSimulatorService
	ts          port.ThermometerService
}

func New(tss port.ThermometerSimulatorService, ts port.ThermometerService, aus port.AuthService) *SimulatorHandler {
	middlewares := handlers.NewEchoMiddlewares(aus)
	return &SimulatorHandler{tss: tss, ts: ts, middlewares: middlewares}
}

func (h *SimulatorHandler) SetupLogger(log *zap.Logger) {
	h.log = log
}

func (h *SimulatorHandler) RegisterRoutes(e *echo.Group, api *swag.API) {
	rg := e.Group("/simulator/thermometer", h.middlewares.VerifyTokenMiddleware())
	rg.GET("", h.listThermometers)
	rg.POST("", h.createThermometer)
	rg.GET("/:id/config", h.getThermometerConfig)
	rg.PUT("/:id/config", h.updateThermometerConfig)
	rg.POST("/:id/start", h.startEngine)
	rg.POST("/:id/stop", h.stopEngine)

	ag := api.WithGroup("/simulator/thermometer")
	ag.AddEndpoint(
		endpoint.New(
			http.MethodGet, "/",
			endpoint.Tags("Simulator.Thermometer"),
			endpoint.Summary("List thermometers"),
			endpoint.OperationID("list"),
			endpoint.Description("List thermometers"),
			endpoint.Response(
				http.StatusOK,
				"ListThermometersResponse",
				endpoint.SchemaResponseOption(new(ListThermometersResponse)),
			),
		),
		endpoint.New(
			http.MethodPost, "/",
			endpoint.Tags("Simulator.Thermometer"),
			endpoint.Summary("Create thermometer"),
			endpoint.OperationID("create"),
			endpoint.Description("Create thermometer"),
			endpoint.Body(new(CreateThermometerRequest), "CreateThermometerRequest", true),
			endpoint.Response(
				http.StatusOK,
				"CreateThermometerResponse",
				endpoint.SchemaResponseOption(new(CreateThermometerResponse)),
			),
		),
		endpoint.New(
			http.MethodGet, "/{id}/config",
			endpoint.Tags("Simulator.Thermometer"),
			endpoint.Summary("Get thermometer config"),
			endpoint.OperationID("getConfig"),
			endpoint.Description("Get thermometer config"),
			endpoint.Path("id", "string", "Thermometer ID", true),
			endpoint.Response(
				http.StatusOK,
				"GetThermometerConfigResponse",
				endpoint.SchemaResponseOption(new(GetThermometerConfigResponse)),
			),
		),
		endpoint.New(
			http.MethodPut, "/{id}/config",
			endpoint.Tags("Simulator.Thermometer"),
			endpoint.Summary("Update thermometer config"),
			endpoint.OperationID("updateConfig"),
			endpoint.Description("Update thermometer config"),
			endpoint.Path("id", "string", "Thermometer ID", true),
			endpoint.Body(new(UpdateThermometerConfigRequest), "UpdateThermometerConfigRequest", true),
			endpoint.Response(
				http.StatusOK,
				"UpdateThermometerConfigResponse",
				endpoint.SchemaResponseOption(new(UpdateThermometerConfigResponse)),
			),
		),
		endpoint.New(
			http.MethodPost, "/{id}/start",
			endpoint.Tags("Simulator.Thermometer"),
			endpoint.Summary("Start thermometer engine"),
			endpoint.OperationID("startEngine"),
			endpoint.Description("Start thermometer engine"),
			endpoint.Path("id", "string", "Thermometer ID", true),
			endpoint.Response(
				http.StatusOK,
				"StartEngineResponse",
				endpoint.SchemaResponseOption(new(StartEngineResponse)),
			),
		),
		endpoint.New(
			http.MethodPost, "/{id}/stop",
			endpoint.Tags("Simulator.Thermometer"),
			endpoint.Summary("Stop thermometer engine"),
			endpoint.OperationID("stopEngine"),
			endpoint.Description("Stop thermometer engine"),
			endpoint.Path("id", "string", "Thermometer ID", true),
			endpoint.Response(
				http.StatusOK,
				"StopEngineResponse",
				endpoint.SchemaResponseOption(new(StopEngineResponse)),
			),
		),
	)
}
