package authhandler

import (
	"net/http"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type RegisterRequest struct {
	FullName string `json:"full_name" example:"John Doe"`
	Email    string `json:"email" example:"john.doe@example.com"`
	Username string `json:"username" example:"johndoe"`
	Password string `json:"password" example:"password"`
}

type RegisterResponse struct {
	Status int                       `json:"status" example:"200"`
	Data   RegisterErrorResponseData `json:"data"`
}

type RegisterErrorResponseData struct {
	UserID uuid.UUID `json:"user_id" example:"123e4567-e89b-12d3-a456-426614174000"`
}

func (h *AuthHandler) register(c echo.Context) error {
	var reqBody RegisterRequest
	if err := c.Bind(&reqBody); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	userID, err := h.aus.Register(reqBody.FullName, reqBody.Email, reqBody.Username, reqBody.Password)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, &RegisterResponse{
		Status: http.StatusOK,
		Data:   RegisterErrorResponseData{UserID: userID},
	})
}
