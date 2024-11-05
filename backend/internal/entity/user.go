package entity

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type User struct {
	ID           uuid.UUID      `json:"id" gorm:"primary_key"`
	FullName     string         `json:"full_name" gorm:"not null"`
	Email        string         `json:"email" gorm:"not null;unique"`
	Username     string         `json:"username" gorm:"not null;unique"`
	Password     string         `json:"password" gorm:"not null"`
	Settings     []*UserSetting `json:"settings" gorm:"foreignKey:OwnerID;references:ID;"`
	Sensors      []*Sensor      `json:"sensors" gorm:"foreignKey:OwnerID;references:ID;"`
	Thermometers []*Thermometer `json:"thermometers" gorm:"foreignKey:OwnerID;references:ID;"`
	CreatedAt    time.Time      `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt    time.Time      `json:"updated_at" gorm:"autoUpdateTime"`
}

func (u *User) BeforeCreate(_ *gorm.DB) error {
	u.ID = uuid.New()
	return nil
}

type UserSetting struct {
	ID        uuid.UUID      `json:"id" gorm:"primary_key"`
	OwnerID   uuid.UUID      `json:"owner_id" gorm:"not null"`
	Key       string         `json:"key" gorm:"not null"`
	Value     datatypes.JSON `json:"value" gorm:"not null"`
	CreatedAt time.Time      `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt time.Time      `json:"updated_at" gorm:"autoUpdateTime"`
}

func (u *UserSetting) BeforeCreate(_ *gorm.DB) error {
	u.ID = uuid.New()
	return nil
}
