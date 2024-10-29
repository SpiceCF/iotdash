package sensorhandler

import (
	"iotdash/backend/internal/core/domain"
	"net/http"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type ListSensorsResponse struct {
	Status string           `json:"status" example:"success"`
	Data   []*domain.Sensor `json:"data"`
}

func (h *SensorHandler) listSensors(c echo.Context) error {
	userID, ok := c.Get("userID").(uuid.UUID)
	if !ok {
		return c.JSON(http.StatusUnauthorized, "Unauthorized")
	}

	sns, err := h.sns.ListSensorsByUserID(userID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, ListSensorsResponse{
		Status: "success",
		Data:   sns,
	})
}
