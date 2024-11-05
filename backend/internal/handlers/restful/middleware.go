package restful

import (
	"iotdash/backend/internal/service"
	"net/http"
	"strings"

	"github.com/labstack/echo/v4"
)

type RouteMiddlewares struct {
	aus service.IAuthService
}

func NewRouteMiddlewares(aus service.IAuthService) *RouteMiddlewares {
	return &RouteMiddlewares{aus: aus}
}

func (h *RouteMiddlewares) VerifyTokenMiddleware() echo.MiddlewareFunc {
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
