package service

import (
	"iotdash/backend/internal/entity"
	"iotdash/backend/internal/repositories/sqlite"

	"github.com/google/uuid"
)

type IUserService interface {
	Create(user *entity.User) (uuid.UUID, error)
	FindByID(id uuid.UUID) (*entity.User, error)
	FindByUsername(username string) (*entity.User, error)
	ListSettings(userID uuid.UUID) ([]entity.UserSetting, error)
}

var _ IUserService = (*UserService)(nil)

type UserService struct {
	ur sqlite.IUserRepository
}

func NewUserService(ur sqlite.IUserRepository) *UserService {
	return &UserService{ur: ur}
}

func (s *UserService) Create(user *entity.User) (uuid.UUID, error) {
	return s.ur.Create(user)
}

func (s *UserService) FindByID(id uuid.UUID) (*entity.User, error) {
	return s.ur.FindByID(id)
}

func (s *UserService) FindByUsername(username string) (*entity.User, error) {
	return s.ur.FindByUsername(username)
}

func (s *UserService) ListSettings(userID uuid.UUID) ([]entity.UserSetting, error) {
	return s.ur.ListSettings(userID)
}
