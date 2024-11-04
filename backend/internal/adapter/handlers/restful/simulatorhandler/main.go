package simulatorhandler

import (
	"iotdash/backend/internal/adapter/handlers"
	"iotdash/backend/internal/core/port"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/zc2638/swag"
	"github.com/zc2638/swag/endpoint"
	"go.uber.org/zap"
)

var _ handlers.EchoRouteHandler = (*SimulatorHandler)(nil)

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
	rg.GET("/:id", h.getThermometer)
	rg.GET("/:id/history", h.getTMHistory)
	rg.PUT("/:id/config", h.updateThermometerConfig)
	rg.POST("/:id/start", h.engineSwitch("start"))
	rg.POST("/:id/stop", h.engineSwitch("stop"))

	registerSwagger(api)
}

func registerSwagger(api *swag.API) {
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
			http.MethodGet, "/{id}",
			endpoint.Tags("Simulator.Thermometer"),
			endpoint.Summary("Get thermometer"),
			endpoint.OperationID("get"),
			endpoint.Description("Get thermometer"),
			endpoint.Path("id", "string", "Thermometer ID", true),
			endpoint.Response(
				http.StatusOK,
				"GetThermometerResponse",
				endpoint.SchemaResponseOption(new(GetThermometerResponse)),
			),
		),
		endpoint.New(
			http.MethodGet, "/{id}/history",
			endpoint.Tags("Simulator.Thermometer"),
			endpoint.Summary("Get thermometer history"),
			endpoint.OperationID("getHistory"),
			endpoint.Description("Get thermometer history"),
			endpoint.Path("id", "string", "Thermometer ID", true),
			endpoint.Response(
				http.StatusOK,
				"GetTMHistoryResponse",
				endpoint.SchemaResponseOption(new(GetTMHistoryResponse)),
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
				"EngineSwitchResponse",
				endpoint.SchemaResponseOption(new(EngineSwitchResponse)),
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
				"EngineSwitchResponse",
				endpoint.SchemaResponseOption(new(EngineSwitchResponse)),
			),
		),
	)
}
