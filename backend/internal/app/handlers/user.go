package handlers

import (
	"iotdash/backend/internal/core/port"
	"net/http"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"github.com/zc2638/swag"
	"go.uber.org/zap"
)

var _ EchoRouteHandler = &UserHandler{}

type UserHandler struct {
	log         *zap.Logger
	middlewares *EchoMiddlewares
	us          port.UserService
}

func NewUserHandler(us port.UserService, aus port.AuthService) *UserHandler {
	middlewares := NewEchoMiddlewares(aus)
	return &UserHandler{us: us, middlewares: middlewares}
}

func (h *UserHandler) SetupLogger(log *zap.Logger) {
	h.log = log
}

func (h *UserHandler) RegisterRoutes(e *echo.Group, api *swag.API) {
	rg := e.Group("/users", h.middlewares.VerifyTokenMiddleware())
	rg.GET("/me", h.getMe)
	rg.GET("/me/settings", h.getMeSettings)
}

func (h *UserHandler) getMe(c echo.Context) error {
	userID := c.Get("userID").(uuid.UUID)
	user, err := h.us.FindByID(userID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	user.Password = ""

	return c.JSON(http.StatusOK, user)
}

func (h *UserHandler) getMeSettings(c echo.Context) error {
	userID := c.Get("userID").(uuid.UUID)
	settings, err := h.us.ListSettings(userID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, settings)
}
