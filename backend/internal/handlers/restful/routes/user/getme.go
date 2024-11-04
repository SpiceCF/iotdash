package user

import (
	"iotdash/backend/internal/entity"
	"net/http"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type GetMeResponse struct {
	Status int          `json:"status" example:"200"`
	Data   *entity.User `json:"data"`
}

func (h *RouteHandler) getMe(c echo.Context) error {
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
		Status: http.StatusOK,
		Data:   user,
	})
}
