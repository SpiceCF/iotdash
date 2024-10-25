package handlers

import (
	"fmt"
	"iotdash/backend/internal/core/domain"
	"iotdash/backend/internal/core/port"
	"net/http"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"go.uber.org/zap"
)

var _ EchoRouteHandler = &SimulatorHandler{}

type SimulatorHandler struct {
	log         *zap.Logger
	middlewares *EchoMiddlewares
	tss         port.ThermometerSimulatorService
	ts          port.ThermometerService
}

func NewSimulatorHandler(tss port.ThermometerSimulatorService, ts port.ThermometerService, aus port.AuthService) *SimulatorHandler {
	middlewares := NewEchoMiddlewares(aus)
	return &SimulatorHandler{tss: tss, ts: ts, middlewares: middlewares}
}

func (h *SimulatorHandler) SetupLogger(log *zap.Logger) {
	h.log = log
}

func (h *SimulatorHandler) RegisterRoutes(e *echo.Group) {
	rg := e.Group("/simulator/thermometers", h.middlewares.VerifyTokenMiddleware())
	rg.GET("", h.listThermometers)
	rg.POST("", h.createThermometer)
	rg.GET("/:id/config", h.getThermometerConfig)
	rg.PUT("/:id/config", h.updateThermometerConfig)
	rg.POST("/:id/start", h.startEngine)
	rg.POST("/:id/stop", h.stopEngine)
}

func (h *SimulatorHandler) listThermometers(c echo.Context) error {
	userID := c.Get("userID").(uuid.UUID)

	thermometers, err := h.ts.ListByOwnerID(userID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, thermometers)
}

type CreateThermometerRequest struct {
	ThermometerConfig domain.ThermometerConfig `json:"config"`
}

func (h *SimulatorHandler) createThermometer(c echo.Context) error {
	userID := c.Get("userID").(uuid.UUID)

	var req CreateThermometerRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	thermometer, err := h.ts.Create(userID, req.ThermometerConfig)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	h.tss.LoadThermometers([]*domain.Thermometer{thermometer})

	return c.JSON(http.StatusOK, thermometer)
}

func (h *SimulatorHandler) startEngine(c echo.Context) error {
	id := c.Param("id")

	err := h.tss.StartEngine(uuid.MustParse(id))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, map[string]string{"message": fmt.Sprintf("Engine started for thermometer %s", id)})
}

func (h *SimulatorHandler) stopEngine(c echo.Context) error {
	id := c.Param("id")

	err := h.tss.StopEngine(uuid.MustParse(id))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.NoContent(http.StatusOK)
}

type UpdateThermometerRequest struct {
	ThermometerConfig domain.ThermometerConfig `json:"config"`
}

func (h *SimulatorHandler) updateThermometerConfig(c echo.Context) error {
	id := c.Param("id")

	var req UpdateThermometerRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	thermometer, err := h.ts.GetByID(uuid.MustParse(id))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	thermometer.Config = req.ThermometerConfig

	err = h.ts.Update(thermometer)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	h.tss.LoadThermometers([]*domain.Thermometer{thermometer})

	return c.JSON(http.StatusOK, map[string]string{"message": fmt.Sprintf("Thermometer %s config updated", id)})
}

func (h *SimulatorHandler) getThermometerConfig(c echo.Context) error {
	id := c.Param("id")

	thermometer, err := h.ts.GetByID(uuid.MustParse(id))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, thermometer.Config)
}
