package handlers

import (
	"encoding/json"
	"iotdash/backend/internal/core/domain"
	"iotdash/backend/internal/core/port"
	"net/http"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"go.uber.org/zap"
)

var _ EchoRouteHandler = &SensorHandler{}

type SensorHandler struct {
	log         *zap.Logger
	sns         port.SensorService
	middlewares *EchoMiddlewares
}

func NewSensorHandler(sns port.SensorService, aus port.AuthService) *SensorHandler {
	middlewares := NewEchoMiddlewares(aus)
	return &SensorHandler{sns: sns, middlewares: middlewares}
}

func (h *SensorHandler) SetupLogger(log *zap.Logger) {
	h.log = log
}

func (h *SensorHandler) RegisterRoutes(e *echo.Group) {
	rg := e.Group("/sensors")
	rg.GET("", h.listSensors, h.middlewares.VerifyTokenMiddleware())
	rg.POST("", h.createSensor, h.middlewares.VerifyTokenMiddleware())
	rg.GET("/:id/logs", h.getSensorLogs, h.middlewares.VerifyTokenMiddleware())
	rg.POST("/thermometers/logs", h.createSensorLog(domain.SensorTypeThermometer))
}

type CreateSensorRequest struct {
	ID   uuid.UUID         `json:"id"`
	Name string            `json:"name"`
	Type domain.SensorType `json:"type"`
}

func (h *SensorHandler) createSensor(c echo.Context) error {
	var reqBody CreateSensorRequest
	if err := c.Bind(&reqBody); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	if reqBody.ID == uuid.Nil {
		return c.JSON(http.StatusBadRequest, "id is invalid")
	}

	sensor := &domain.Sensor{
		ID:   reqBody.ID,
		Type: reqBody.Type,
	}

	if err := h.sns.CreateSensor(sensor); err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, sensor)
}

func (h *SensorHandler) listSensors(c echo.Context) error {
	userID := c.Get("userID").(uuid.UUID)

	sns, err := h.sns.ListSensorsByUserID(userID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, sns)
}

func (h *SensorHandler) getSensorLogs(c echo.Context) error {
	sensorID, err := uuid.Parse(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	sensorLogs, err := h.sns.ListSensorLogs(sensorID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, sensorLogs)
}

func (h *SensorHandler) createSensorLog(senserType domain.SensorType) echo.HandlerFunc {
	return func(c echo.Context) error {
		var reqBody map[string]interface{}
		if err := c.Bind(&reqBody); err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}

		valueJson, err := json.Marshal(reqBody)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, err.Error())
		}

		sensorLog := &domain.SensorLog{
			DeviceID:   uuid.MustParse(reqBody["id"].(string)),
			SensorType: senserType,
			Value:      valueJson,
		}

		if err := h.sns.CreateSensorLog(sensorLog); err != nil {
			return c.JSON(http.StatusInternalServerError, err.Error())
		}

		return c.JSON(http.StatusOK, map[string]string{"message": "Sensor log created"})
	}
}
