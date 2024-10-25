package handlers

import (
	"iotdash/backend/internal/core/port"
	"net/http"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"go.uber.org/zap"
)

var _ EchoRouteHandler = &AuthHandler{}

type AuthHandler struct {
	aus         port.AuthService
	log         *zap.Logger
	middlewares *EchoMiddlewares
}

func NewAuthHandler(aus port.AuthService) *AuthHandler {
	middlewares := NewEchoMiddlewares(aus)
	return &AuthHandler{aus: aus, middlewares: middlewares}
}

func (h *AuthHandler) SetupLogger(log *zap.Logger) {
	h.log = log
}

func (h *AuthHandler) RegisterRoutes(e *echo.Group) {
	rg := e.Group("/auth")
	rg.POST("/login", h.login)
	rg.POST("/register", h.register)
	rg.GET("/verify-token", h.verifyToken, h.middlewares.VerifyTokenMiddleware())
}

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
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

	return c.JSON(http.StatusOK, map[string]string{"token": token})
}

type RegisterRequest struct {
	FullName string `json:"fullName"`
	Email    string `json:"email"`
	Username string `json:"username"`
	Password string `json:"password"`
}

func (h *AuthHandler) register(c echo.Context) error {
	var reqBody RegisterRequest
	if err := c.Bind(&reqBody); err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	if err := h.aus.Register(reqBody.FullName, reqBody.Email, reqBody.Username, reqBody.Password); err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.NoContent(http.StatusOK)
}

func (h *AuthHandler) verifyToken(c echo.Context) error {
	userID := c.Get("userID").(uuid.UUID)
	return c.JSON(http.StatusOK, map[string]string{"userID": userID.String()})
}
