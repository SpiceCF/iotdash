package simulatorhandler

import (
	"fmt"
	"net/http"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type StartEngineResponse struct {
	Status  string `json:"status" example:"success"`
	Message string `json:"message" example:"Engine started"`
}

func (h *SimulatorHandler) startEngine(c echo.Context) error {
	id := c.Param("id")
	thermometerID, err := uuid.Parse(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	err = h.tss.StartEngine(thermometerID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, StartEngineResponse{
		Status:  "success",
		Message: fmt.Sprintf("Thermometer %s engine started", id),
	})
}
