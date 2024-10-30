package service

import (
	"errors"
	"fmt"
	"iotdash/backend/internal/core/domain"
	"iotdash/backend/internal/core/port"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

var _ port.AuthService = (*AuthService)(nil)

type AuthService struct {
	us        port.UserService
	jwtSecret string
}

type LoginResponse struct {
	ID    uuid.UUID `json:"id"`
	Token string    `json:"token"`
}

func NewAuthService(us port.UserService) *AuthService {
	jwtSecret := os.Getenv("JWT_SECRET")
	if jwtSecret == "" {
		jwtSecret = "secret"
	}

	return &AuthService{us: us, jwtSecret: jwtSecret}
}

func (s *AuthService) Login(username, password string) (string, error) {
	user, err := s.us.FindByUsername(username)
	if err != nil {
		return "", err
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		return "", err
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": user.ID,
		"exp": time.Now().Add(time.Hour * 12).Unix(),
	})

	tokenString, err := token.SignedString([]byte(s.jwtSecret))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func (s *AuthService) VerifyToken(tokenString string) (uuid.UUID, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(s.jwtSecret), nil
	})

	if err != nil {
		fmt.Println(err)
		return uuid.UUID{}, err
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		return uuid.UUID{}, errors.New("invalid token claims")
	}

	return uuid.MustParse(claims["sub"].(string)), nil
}

func (s *AuthService) Register(fullName, email, username, password string) (uuid.UUID, error) {
	passwordBcrypted, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return uuid.Nil, err
	}

	user := &domain.User{
		FullName: fullName,
		Email:    email,
		Username: username,
		Password: string(passwordBcrypted),
	}

	return s.us.Create(user)
}
