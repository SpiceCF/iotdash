package auth

import (
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
	aus service.IAuthService
	log *zap.Logger
}

func New(aus service.IAuthService) *RouteHandler {
	return &RouteHandler{aus: aus}
}

func (h *RouteHandler) SetupLogger(log *zap.Logger) {
	h.log = log
}

func (h *RouteHandler) RegisterRoutes(e *echo.Group, api *swag.API) {
	rg := e.Group("/auth")

	rg.POST("/login", h.login)
	rg.POST("/register", h.register)

	ag := api.WithGroup("/auth")
	ag.AddEndpoint(
		endpoint.New(
			http.MethodPost, "/login",
			endpoint.Tags("Auth"),
			endpoint.Summary("Login"),
			endpoint.OperationID("login"),
			endpoint.Description("Login to the system"),
			endpoint.Body(new(LoginRequest), "Login request", true),
			endpoint.Response(
				http.StatusOK,
				"Successfully logged in",
				endpoint.SchemaResponseOption(new(LoginResponse)),
			),
		),
		endpoint.New(
			http.MethodPost, "/register",
			endpoint.Tags("Auth"),
			endpoint.Summary("Register"),
			endpoint.OperationID("register"),
			endpoint.Description("Register to the system"),
			endpoint.Body(new(RegisterRequest), "Register request", true),
			endpoint.Response(
				http.StatusOK,
				"Successfully registered",
				endpoint.SchemaResponseOption(new(RegisterResponse)),
			),
		),
	)
}
