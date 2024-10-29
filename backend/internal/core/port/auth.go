package port

import "github.com/google/uuid"

type AuthService interface {
	Login(username, password string) (string, error)
	VerifyToken(token string) (userID uuid.UUID, err error)
	Register(fullName, email, username, password string) (uuid.UUID, error)
}
