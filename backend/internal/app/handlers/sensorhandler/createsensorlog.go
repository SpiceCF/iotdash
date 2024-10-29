package sensorhandler

import (
	"iotdash/backend/internal/core/domain"
	"net/http"

	"github.com/labstack/echo/v4"
)

type CreateThermometerLogRequest *domain.SensorLog

type CreateThermometerLogResponse struct {
	Status  string `json:"status" example:"success"`
	Message string `json:"message" example:"Sensor log created"`
}

func (h *SensorHandler) createThermometerLog() echo.HandlerFunc {
	return func(c echo.Context) error {
		var sensorLog CreateThermometerLogRequest
		if err := c.Bind(&sensorLog); err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}

		if err := h.sns.CreateSensorLog(sensorLog); err != nil {
			return c.JSON(http.StatusInternalServerError, err.Error())
		}

		return c.JSON(http.StatusOK, CreateThermometerLogResponse{
			Status:  "success",
			Message: "Sensor log created",
		})
	}
}
