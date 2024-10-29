package port

import (
	"iotdash/backend/internal/core/domain"

	"github.com/google/uuid"
)

type UserRepository interface {
	Create(user *domain.User) (uuid.UUID, error)
	FindByID(id uuid.UUID) (*domain.User, error)
	FindByUsername(username string) (*domain.User, error)
	ListSettings(userID uuid.UUID) ([]domain.UserSetting, error)
}

type UserService interface {
	Create(user *domain.User) (uuid.UUID, error)
	FindByID(id uuid.UUID) (*domain.User, error)
	FindByUsername(username string) (*domain.User, error)
	ListSettings(userID uuid.UUID) ([]domain.UserSetting, error)
}
