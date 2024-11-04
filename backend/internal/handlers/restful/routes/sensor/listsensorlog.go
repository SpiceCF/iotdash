package sensor

import (
	"iotdash/backend/internal/entity"
	"net/http"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type ListSensorLogsResponse struct {
	Status int                 `json:"status" example:"200"`
	Data   []*entity.SensorLog `json:"data"`
}

func (h *RouteHandler) listSensorLogs(c echo.Context) error {
	userID, ok := c.Get("userID").(uuid.UUID)
	if !ok {
		return c.JSON(http.StatusUnauthorized, "Unauthorized")
	}

	sensorID, err := uuid.Parse(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	sensor, err := h.sns.GetSensorByID(sensorID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	if sensor.OwnerID != userID {
		return c.JSON(http.StatusForbidden, "Forbidden")
	}

	sensorLogs, err := h.sns.ListSensorLogs(sensor.DeviceID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, ListSensorLogsResponse{
		Status: http.StatusOK,
		Data:   sensorLogs,
	})
}
