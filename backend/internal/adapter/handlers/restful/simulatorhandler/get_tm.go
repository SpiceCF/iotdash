package simulatorhandler

import (
	"iotdash/backend/internal/core/domain"
	"net/http"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type GetThermometerResponse struct {
	Status int                `json:"status" example:"200"`
	Data   domain.Thermometer `json:"data"`
}

func (h *SimulatorHandler) getThermometer(c echo.Context) error {
	id := c.Param("id")
	thermometerID, err := uuid.Parse(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	thermometer, err := h.ts.GetByID(thermometerID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, GetThermometerResponse{
		Status: http.StatusOK,
		Data:   *thermometer,
	})
}
