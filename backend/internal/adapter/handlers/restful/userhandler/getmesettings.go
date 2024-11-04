package userhandler

import (
	"iotdash/backend/internal/core/domain"
	"net/http"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type GetMeSettingsResponse struct {
	Status int                  `json:"status" example:"200"`
	Data   []domain.UserSetting `json:"data"`
}

func (h *UserHandler) getMeSettings(c echo.Context) error {
	userID, ok := c.Get("userID").(uuid.UUID)
	if !ok {
		return c.JSON(http.StatusUnauthorized, "Unauthorized")
	}
	settings, err := h.us.ListSettings(userID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, GetMeSettingsResponse{
		Status: http.StatusOK,
		Data:   settings,
	})
}
