package simulatorhandler

import (
	"iotdash/backend/internal/core/domain"
	"net/http"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type ListThermometersResponse struct {
	Status int                   `json:"status" example:"200"`
	Data   []*domain.Thermometer `json:"data"`
}

func (h *SimulatorHandler) listThermometers(c echo.Context) error {
	userID, ok := c.Get("userID").(uuid.UUID)
	if !ok {
		return c.JSON(http.StatusUnauthorized, "Unauthorized")
	}

	thermometers, err := h.ts.ListByOwnerID(userID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, ListThermometersResponse{
		Status: http.StatusOK,
		Data:   thermometers,
	})
}
