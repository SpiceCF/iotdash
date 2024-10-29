package simulatorhandler

import (
	"fmt"
	"iotdash/backend/internal/core/domain"
	"net/http"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type UpdateThermometerConfigRequest struct {
	ThermometerConfig domain.ThermometerConfig `json:"config"`
}

type UpdateThermometerConfigResponse struct {
	Status  string `json:"status" example:"success"`
	Message string `json:"message" example:"Thermometer config updated"`
}

func (h *SimulatorHandler) updateThermometerConfig(c echo.Context) error {
	id := c.Param("id")
	thermometerID, err := uuid.Parse(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	var req UpdateThermometerConfigRequest
	if err = c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	thermometer, err := h.ts.GetByID(thermometerID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	thermometer.Config = req.ThermometerConfig

	err = h.ts.Update(thermometer)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	err = h.tss.LoadThermometers([]*domain.Thermometer{thermometer})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, UpdateThermometerConfigResponse{
		Status:  "success",
		Message: fmt.Sprintf("Thermometer %s config updated", id),
	})
}
