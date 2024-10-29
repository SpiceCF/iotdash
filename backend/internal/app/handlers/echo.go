package handlers

import (
	"iotdash/backend/pkg/zaplog"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/zc2638/swag"
	"github.com/zc2638/swag/option"
	"go.uber.org/zap"
)

type EchoRouteHandler interface {
	SetupLogger(log *zap.Logger)
	RegisterRoutes(e *echo.Group, api *swag.API)
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

	api := swag.New(
		option.Title("Example API Doc"),
		option.BasePath("/api/v1"),
	)

	for _, h := range handlers {
		h.SetupLogger(log)
		h.RegisterRoutes(rg, api)
	}

	e.GET("/swagger/json", echo.WrapHandler(api.Handler()))
	e.GET("/swagger/ui/*", echo.WrapHandler(swag.UIHandler("/swagger/ui", "/swagger/json", true)))

	return e
}
