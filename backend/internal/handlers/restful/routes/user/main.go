package user

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
	log         *zap.Logger
	middlewares *restful.RouteMiddlewares
	us          service.IUserService
}

func New(us service.IUserService, aus service.IAuthService) *RouteHandler {
	middlewares := restful.NewRouteMiddlewares(aus)
	return &RouteHandler{us: us, middlewares: middlewares}
}

func (h *RouteHandler) SetupLogger(log *zap.Logger) {
	h.log = log
}

func (h *RouteHandler) RegisterRoutes(e *echo.Group, api *swag.API) {
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
