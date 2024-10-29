package authhandler

import (
	"iotdash/backend/internal/app/handlers"
	"iotdash/backend/internal/core/port"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/zc2638/swag"
	"github.com/zc2638/swag/endpoint"
	"go.uber.org/zap"
)

var _ handlers.EchoRouteHandler = &AuthHandler{}

type AuthHandler struct {
	aus port.AuthService
	log *zap.Logger
}

func New(aus port.AuthService) *AuthHandler {
	return &AuthHandler{aus: aus}
}

func (h *AuthHandler) SetupLogger(log *zap.Logger) {
	h.log = log
}

func (h *AuthHandler) RegisterRoutes(e *echo.Group, api *swag.API) {
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
