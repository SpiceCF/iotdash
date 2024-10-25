package handlers

import (
	"iotdash/backend/pkg/zaplog"

	"github.com/labstack/echo/v4"
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

	for _, h := range handlers {
		h.SetupLogger(log)
		h.RegisterRoutes(e.Group("/api/v1"))
	}
	return e
}
