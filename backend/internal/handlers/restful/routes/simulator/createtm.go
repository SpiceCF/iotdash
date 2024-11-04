package simulator

import (
	"iotdash/backend/internal/entity"
	"net/http"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type CreateThermometerRequest struct {
	ThermometerConfig entity.ThermometerConfig `json:"config"`
}

type CreateThermometerResponse struct {
	Status int                 `json:"status" example:"200"`
	Data   *entity.Thermometer `json:"data"`
}

func (h *RouteHandler) createThermometer(c echo.Context) error {
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

	err = h.tss.LoadThermometers([]*entity.Thermometer{thermometer})
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, CreateThermometerResponse{
		Status: http.StatusOK,
		Data:   thermometer,
	})
}
