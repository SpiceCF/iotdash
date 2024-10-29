package sensorhandler

import (
	"iotdash/backend/internal/core/domain"
	"net/http"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type CreateSensorRequest struct {
	DeviceID uuid.UUID         `json:"device_id" example:"123e4567-e89b-12d3-a456-426614174000"`
	Name     string            `json:"name" example:"bedroom"`
	Type     domain.SensorType `json:"type" example:"thermometer"`
}

type CreateSensorResponse struct {
	Status string         `json:"status" example:"success"`
	Data   *domain.Sensor `json:"data"`
}

func (h *SensorHandler) createSensor(c echo.Context) error {
	userID, ok := c.Get("userID").(uuid.UUID)
	if !ok {
		return c.JSON(http.StatusUnauthorized, "Unauthorized")
	}

	var reqBody CreateSensorRequest
	if err := c.Bind(&reqBody); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	if reqBody.DeviceID == uuid.Nil {
		return c.JSON(http.StatusBadRequest, "id is invalid")
	}

	sensor := &domain.Sensor{
		OwnerID:  userID,
		DeviceID: reqBody.DeviceID,
		Name:     reqBody.Name,
		Type:     reqBody.Type,
	}

	if err := h.sns.CreateSensor(sensor); err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, CreateSensorResponse{
		Status: "success",
		Data:   sensor,
	})
}
