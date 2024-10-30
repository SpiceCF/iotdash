package simulatorhandler

import (
	"fmt"
	"iotdash/backend/internal/core/domain"
	"net/http"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type StartEngineResponse struct {
	Status  int    `json:"status" example:"200"`
	Message string `json:"message" example:"Engine started"`
}

func (h *SimulatorHandler) startEngine(c echo.Context) error {
	id := c.Param("id")
	thermometerID, err := uuid.Parse(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	err = h.ts.Update(&domain.Thermometer{
		ID:       thermometerID,
		IsActive: true,
	})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	err = h.tss.StartEngine(thermometerID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, StartEngineResponse{
		Status:  http.StatusOK,
		Message: fmt.Sprintf("Thermometer %s engine started", id),
	})
}
