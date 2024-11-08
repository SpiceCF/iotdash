package simulator

import (
	"fmt"
	"iotdash/backend/internal/entity"
	"net/http"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type UpdateThermometerConfigRequest struct {
	ThermometerConfig entity.ThermometerConfig `json:"config"`
}

type UpdateThermometerConfigResponse struct {
	Status  int    `json:"status" example:"200"`
	Message string `json:"message" example:"Thermometer config updated"`
}

func (h *RouteHandler) updateThermometerConfig(c echo.Context) error {
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

	err = h.tss.LoadThermometers([]*entity.Thermometer{thermometer})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, UpdateThermometerConfigResponse{
		Status:  http.StatusOK,
		Message: fmt.Sprintf("Thermometer %s config updated", id),
	})
}
