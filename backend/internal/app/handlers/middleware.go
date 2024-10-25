package handlers

import (
	"iotdash/backend/internal/core/port"
	"net/http"
	"strings"

	"github.com/labstack/echo/v4"
)

type EchoMiddlewares struct {
	aus port.AuthService
}

func NewEchoMiddlewares(aus port.AuthService) *EchoMiddlewares {
	return &EchoMiddlewares{aus: aus}
}

func (h *EchoMiddlewares) VerifyTokenMiddleware() echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			tokenString := c.Request().Header.Get("Authorization")
			if tokenString == "" {
				return c.JSON(http.StatusBadRequest, "token is required")
			}

			userID, err := h.aus.VerifyToken(strings.TrimPrefix(tokenString, "Bearer "))
			if err != nil {
				return c.JSON(http.StatusUnauthorized, err.Error())
			}

			c.Set("userID", userID)

			return next(c)
		}
	}
}
