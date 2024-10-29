package simulatorhandler

import (
	"fmt"
	"net/http"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type StopEngineResponse struct {
	Status  string `json:"status" example:"success"`
	Message string `json:"message" example:"Engine stopped"`
}

func (h *SimulatorHandler) stopEngine(c echo.Context) error {
	id := c.Param("id")
	thermometerID, err := uuid.Parse(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	err = h.tss.StopEngine(thermometerID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, StopEngineResponse{
		Status:  "success",
		Message: fmt.Sprintf("Thermometer %s engine stopped", id),
	})
}
