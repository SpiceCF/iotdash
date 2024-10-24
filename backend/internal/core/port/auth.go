package port

import "iotdash/backend/internal/core/domain"

type AuthService interface {
	Login(user *domain.User) (string, error)
}
