package handlers

import (
	"iotdash/backend/internal/core/port"
	"net/http"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"github.com/zc2638/swag"
	"github.com/zc2638/swag/endpoint"
	"go.uber.org/zap"
)

var _ EchoRouteHandler = &AuthHandler{}

type AuthHandler struct {
	aus port.AuthService
	log *zap.Logger
}

func NewAuthHandler(aus port.AuthService) *AuthHandler {
	return &AuthHandler{aus: aus}
}

func (h *AuthHandler) SetupLogger(log *zap.Logger) {
	h.log = log
}

func (h *AuthHandler) RegisterRoutes(e *echo.Group, api *swag.API) {
	rg := e.Group("/auth")

	rg.POST("/login", h.login)
	rg.POST("/register", h.register)

	ag := api.WithGroup("/auth")
	ag.AddEndpoint(
		endpoint.New(
			http.MethodPost, "/login",
			endpoint.Tags("Auth"),
			endpoint.Summary("Login"),
			endpoint.OperationID("login"),
			endpoint.Description("Login to the system"),
			endpoint.Body(new(LoginRequest), "Login request", true),
			endpoint.Response(
				http.StatusOK,
				"Successfully logged in",
				endpoint.SchemaResponseOption(new(LoginResponse)),
			),
		),
		endpoint.New(
			http.MethodPost, "/register",
			endpoint.Tags("Auth"),
			endpoint.Summary("Register"),
			endpoint.OperationID("register"),
			endpoint.Description("Register to the system"),
			endpoint.Body(new(RegisterRequest), "Register request", true),
			endpoint.Response(
				http.StatusOK,
				"Successfully registered",
				endpoint.SchemaResponseOption(new(RegisterResponse)),
			),
		),
	)
}

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

type RegisterRequest struct {
	FullName string `json:"full_name" example:"John Doe"`
	Email    string `json:"email" example:"john.doe@example.com"`
	Username string `json:"username" example:"johndoe"`
	Password string `json:"password" example:"password"`
}

type RegisterResponse struct {
	Status string                    `json:"status" example:"success"`
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
		Status: "success",
		Data:   RegisterErrorResponseData{UserID: userID},
	})
}
