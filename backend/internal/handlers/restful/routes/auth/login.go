package auth

import (
	"errors"
	"net/http"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

var ErrNotFoundUser = errors.New("invalid username or password")

type LoginRequest struct {
	Username string `json:"username" example:"johndoe"`
	Password string `json:"password" example:"password"`
}

type LoginResponse struct {
	Status int                    `json:"status" example:"200"`
	Data   LoginErrorResponseData `json:"data"`
}

type LoginErrorResponseData struct {
	Token string `json:"token" example:"token"`
}

func (h *RouteHandler) login(c echo.Context) error {
	var reqBody LoginRequest
	if err := c.Bind(&reqBody); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	token, err := h.aus.Login(reqBody.Username, reqBody.Password)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return c.JSON(http.StatusBadRequest, ErrNotFoundUser.Error())
		}

		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, &LoginResponse{
		Status: http.StatusOK,
		Data:   LoginErrorResponseData{Token: token},
	})
}
