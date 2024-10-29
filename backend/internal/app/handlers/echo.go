package handlers

import (
	"iotdash/backend/pkg/zaplog"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"go.uber.org/zap"
)

type EchoRouteHandler interface {
	SetupLogger(log *zap.Logger)
	RegisterRoutes(e *echo.Group)
}

func NewEcho(log *zap.Logger, handlers []EchoRouteHandler) *echo.Echo {
	echoLoggerMiddleware := zaplog.NewEchoLoggerMiddleware(log)

	e := echo.New()
	e.HideBanner = true
	e.Use(echoLoggerMiddleware)
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
	}))

	rg := e.Group("/api/v1")

	rg.GET("/healthcheck", func(c echo.Context) error {
		return c.JSON(http.StatusOK, map[string]string{"status": "healthy"})
	})

	for _, h := range handlers {
		h.SetupLogger(log)
		h.RegisterRoutes(rg)
	}

	return e
}
