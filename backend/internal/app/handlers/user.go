package handlers

import (
	"iotdash/backend/internal/core/port"
	"net/http"

	"github.com/labstack/echo/v4"
	"go.uber.org/zap"
)

var _ EchoRouteHandler = &UserHandler{}

type UserHandler struct {
	us  port.UserService
	log *zap.Logger
}

func NewUserHandler(us port.UserService) *UserHandler {
	return &UserHandler{us: us}
}

func (h *UserHandler) SetupLogger(log *zap.Logger) {
	h.log = log
}

func (h *UserHandler) RegisterRoutes(e *echo.Group) {
	e.POST("/users", h.createUser)
}

func (h *UserHandler) createUser(c echo.Context) error {
	return c.JSON(http.StatusOK, "ok")

}
