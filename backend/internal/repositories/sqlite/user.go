package sqlite

import (
	"iotdash/backend/internal/entity"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type IUserRepository interface {
	Create(user *entity.User) (uuid.UUID, error)
	FindByID(id uuid.UUID) (*entity.User, error)
	FindByUsername(username string) (*entity.User, error)
	ListSettings(userID uuid.UUID) ([]entity.UserSetting, error)
}

var _ IUserRepository = (*UserRepository)(nil)

type UserRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{db: db}
}

func (r *UserRepository) Create(user *entity.User) (uuid.UUID, error) {
	if err := r.db.Create(user).Error; err != nil {
		return uuid.Nil, err
	}
	return user.ID, nil
}

func (r *UserRepository) FindByID(id uuid.UUID) (*entity.User, error) {
	var user entity.User
	if err := r.db.Where("id = ?", id).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *UserRepository) FindByUsername(username string) (*entity.User, error) {
	var user entity.User
	if err := r.db.Where("username = ?", username).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *UserRepository) ListSettings(userID uuid.UUID) ([]entity.UserSetting, error) {
	var settings []entity.UserSetting
	if err := r.db.Where("owner_id = ?", userID).Find(&settings).Error; err != nil {
		return nil, err
	}
	return settings, nil
}
