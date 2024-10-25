package domain

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type User struct {
	ID           uuid.UUID         `json:"id" gorm:"primary_key"`
	FullName     string            `json:"full_name" gorm:"not null"`
	Email        string            `json:"email" gorm:"not null;unique"`
	Username     string            `json:"username" gorm:"not null;unique"`
	Password     string            `json:"password" gorm:"not null"`
	CreatedAt    time.Time         `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt    time.Time         `json:"updated_at" gorm:"autoUpdateTime"`
	Settings     []UserSetting     `json:"settings" gorm:"foreignKey:UserID"`
	Sensors      []UserSensor      `json:"sensors" gorm:"foreignKey:UserID"`
	Thermometers []UserThermometer `json:"thermometers" gorm:"foreignKey:UserID"`
}

func (u *User) BeforeCreate(tx *gorm.DB) error {
	u.ID = uuid.New()
	return nil
}

type UserSetting struct {
	ID        uuid.UUID      `json:"id" gorm:"primary_key"`
	UserID    uuid.UUID      `json:"user_id" gorm:"not null"`
	Key       string         `json:"key" gorm:"not null"`
	Value     datatypes.JSON `json:"value" gorm:"not null"`
	CreatedAt time.Time      `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt time.Time      `json:"updated_at" gorm:"autoUpdateTime"`
}

func (u *UserSetting) BeforeCreate(tx *gorm.DB) error {
	u.ID = uuid.New()
	return nil
}

type UserSensor struct {
	ID       uuid.UUID `json:"id" gorm:"primary_key"`
	UserID   uuid.UUID `json:"user_id" gorm:"not null"`
	SensorID uuid.UUID `json:"sensor_id" gorm:"not null"`
}

func (u *UserSensor) BeforeCreate(tx *gorm.DB) error {
	u.ID = uuid.New()
	return nil
}

type UserThermometer struct {
	ID            uuid.UUID `json:"id" gorm:"primary_key"`
	UserID        uuid.UUID `json:"user_id" gorm:"not null"`
	ThermometerID uuid.UUID `json:"thermometer_id" gorm:"not null"`
}

func (u *UserThermometer) BeforeCreate(tx *gorm.DB) error {
	u.ID = uuid.New()
	return nil
}
