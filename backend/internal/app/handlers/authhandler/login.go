package authhandler

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

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
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, &LoginResponse{
		Status: "success",
		Data:   LoginErrorResponseData{Token: token},
	})
}
