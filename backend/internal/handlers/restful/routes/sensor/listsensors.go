package sensor

import (
	"iotdash/backend/internal/entity"
	"net/http"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type ListSensorsResponse struct {
	Status int              `json:"status" example:"200"`
	Data   []*entity.Sensor `json:"data"`
}

func (h *RouteHandler) listSensors(c echo.Context) error {
	userID, ok := c.Get("userID").(uuid.UUID)
	if !ok {
		return c.JSON(http.StatusUnauthorized, "Unauthorized")
	}

	sns, err := h.sns.ListSensorsByUserID(userID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, ListSensorsResponse{
		Status: http.StatusOK,
		Data:   sns,
	})
}
