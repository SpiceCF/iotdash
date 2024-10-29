package userhandler

import (
	"iotdash/backend/internal/app/handlers"
	"iotdash/backend/internal/core/port"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/zc2638/swag"
	"github.com/zc2638/swag/endpoint"
	"go.uber.org/zap"
)

var _ handlers.EchoRouteHandler = &UserHandler{}

type UserHandler struct {
	log         *zap.Logger
	middlewares *handlers.EchoMiddlewares
	us          port.UserService
}

func New(us port.UserService, aus port.AuthService) *UserHandler {
	middlewares := handlers.NewEchoMiddlewares(aus)
	return &UserHandler{us: us, middlewares: middlewares}
}

func (h *UserHandler) SetupLogger(log *zap.Logger) {
	h.log = log
}

func (h *UserHandler) RegisterRoutes(e *echo.Group, api *swag.API) {
	rg := e.Group("/users", h.middlewares.VerifyTokenMiddleware())
	rg.GET("/me", h.getMe)
	rg.GET("/me/settings", h.getMeSettings)

	ag := api.WithGroup("/users")
	ag.AddEndpoint(
		endpoint.New(
			http.MethodGet, "/me",
			endpoint.Tags("User"),
			endpoint.Summary("Get current user"),
			endpoint.OperationID("getMe"),
			endpoint.Description("Get current user profile"),
			endpoint.Response(
				http.StatusOK,
				"Success",
				endpoint.SchemaResponseOption(new(GetMeResponse)),
			),
		),
		endpoint.New(
			http.MethodGet, "/me/settings",
			endpoint.Tags("User"),
			endpoint.Summary("Get current user settings"),
			endpoint.OperationID("getMeSettings"),
			endpoint.Description("Get current user settings"),
			endpoint.Response(
				http.StatusOK,
				"Success",
				endpoint.SchemaResponseOption(new(GetMeSettingsResponse)),
			),
		),
	)
}
