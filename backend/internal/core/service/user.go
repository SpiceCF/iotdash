package service

import (
	"iotdash/backend/internal/core/domain"
	"iotdash/backend/internal/core/port"

	"github.com/google/uuid"
)

var _ port.UserService = &UserService{}

type UserService struct {
	ur port.UserRepository
}

func NewUserService(ur port.UserRepository) *UserService {
	return &UserService{ur: ur}
}

func (s *UserService) Create(user *domain.User) (uuid.UUID, error) {
	return s.ur.Create(user)
}

func (s *UserService) FindByID(id uuid.UUID) (*domain.User, error) {
	return s.ur.FindByID(id)
}

func (s *UserService) FindByUsername(username string) (*domain.User, error) {
	return s.ur.FindByUsername(username)
}

func (s *UserService) ListSettings(userID uuid.UUID) ([]domain.UserSetting, error) {
	return s.ur.ListSettings(userID)
}
