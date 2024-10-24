package port

import (
	"iotdash/backend/internal/core/domain"

	"github.com/google/uuid"
)

type UserRepository interface {
	CreateUser(user *domain.User) error
	GetUserByID(id uuid.UUID) (*domain.User, error)
}

type UserService interface {
	CreateUser(user *domain.User) error
	GetUserByID(id uuid.UUID) (*domain.User, error)
}
