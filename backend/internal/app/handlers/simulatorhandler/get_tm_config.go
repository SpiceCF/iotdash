package simulatorhandler

import (
	"iotdash/backend/internal/core/domain"
	"net/http"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type GetThermometerConfigResponse struct {
	Status string                   `json:"status" example:"success"`
	Data   domain.ThermometerConfig `json:"data"`
}

func (h *SimulatorHandler) getThermometerConfig(c echo.Context) error {
	id := c.Param("id")
	thermometerID, err := uuid.Parse(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	thermometer, err := h.ts.GetByID(thermometerID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, GetThermometerConfigResponse{
		Status: "success",
		Data:   thermometer.Config,
	})
}
