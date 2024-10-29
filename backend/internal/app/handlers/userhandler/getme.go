package userhandler

import (
	"iotdash/backend/internal/core/domain"
	"net/http"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type GetMeResponse struct {
	Status string       `json:"status" example:"success"`
	Data   *domain.User `json:"data"`
}

func (h *UserHandler) getMe(c echo.Context) error {
	userID, ok := c.Get("userID").(uuid.UUID)
	if !ok {
		return c.JSON(http.StatusUnauthorized, "Unauthorized")
	}
	user, err := h.us.FindByID(userID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	user.Password = ""

	return c.JSON(http.StatusOK, GetMeResponse{
		Status: "success",
		Data:   user,
	})
}
