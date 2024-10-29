package simulatorhandler

import (
	"iotdash/backend/internal/core/domain"
	"net/http"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type CreateThermometerRequest struct {
	ThermometerConfig domain.ThermometerConfig `json:"config"`
}

type CreateThermometerResponse struct {
	Status string              `json:"status"`
	Data   *domain.Thermometer `json:"data"`
}

func (h *SimulatorHandler) createThermometer(c echo.Context) error {
	userID, ok := c.Get("userID").(uuid.UUID)
	if !ok {
		return c.JSON(http.StatusUnauthorized, "Unauthorized")
	}

	var req CreateThermometerRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	thermometer, err := h.ts.Create(userID, req.ThermometerConfig)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	err = h.tss.LoadThermometers([]*domain.Thermometer{thermometer})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, CreateThermometerResponse{
		Status: "success",
		Data:   thermometer,
	})
}
