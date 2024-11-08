package sensor

import (
	"iotdash/backend/internal/entity"
	"net/http"

	"github.com/labstack/echo/v4"
)

type CreateThermometerLogRequest struct {
	entity.SensorLog
	Timestamp string `json:"timestamp" example:"2024-10-29T22:40:03.410461+07:00"`
}
type CreateThermometerLogResponse struct {
	Status  int    `json:"status" example:"200"`
	Message string `json:"message" example:"Sensor log created"`
}

func (h *RouteHandler) createThermometerLog() echo.HandlerFunc {
	return func(c echo.Context) error {
		var sensorLog *entity.SensorLog
		if err := c.Bind(&sensorLog); err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}

		if err := h.sns.CreateSensorLog(sensorLog); err != nil {
			return c.JSON(http.StatusInternalServerError, err.Error())
		}

		return c.JSON(http.StatusOK, CreateThermometerLogResponse{
			Status:  http.StatusOK,
			Message: "Sensor log created",
		})
	}
}
