package authhandler

import (
	"errors"
	"net/http"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

var ErrorNotFoundUser = errors.New("Invalid username or password")

type LoginRequest struct {
	Username string `json:"username" example:"johndoe"`
	Password string `json:"password" example:"password"`
}

type LoginResponse struct {
	Status string                 `json:"status" example:"success"`
	Data   LoginErrorResponseData `json:"data"`
}

type LoginErrorResponseData struct {
	Token string `json:"token" example:"token"`
}

func (h *AuthHandler) login(c echo.Context) error {
	var reqBody LoginRequest
	if err := c.Bind(&reqBody); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	token, err := h.aus.Login(reqBody.Username, reqBody.Password)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.JSON(http.StatusBadRequest, ErrorNotFoundUser.Error())
		}

		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, &LoginResponse{
		Status: "success",
		Data:   LoginErrorResponseData{Token: token},
	})
}
