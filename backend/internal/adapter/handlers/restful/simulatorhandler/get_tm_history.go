package simulatorhandler

import (
	"iotdash/backend/internal/core/domain"
	"net/http"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type GetTMHistoryResponse struct {
	Status int                          `json:"status" example:"200"`
	Data   []*domain.ThermometerHistory `json:"data"`
}

func (h *SimulatorHandler) getTMHistory(c echo.Context) error {
	thermometerID, err := uuid.Parse(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	history, err := h.ts.GetHistoryByThermometerID(thermometerID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, GetTMHistoryResponse{
		Status: http.StatusOK,
		Data:   history,
	})
}
