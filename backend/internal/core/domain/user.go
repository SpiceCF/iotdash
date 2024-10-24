package domain

import (
	"time"

	"github.com/google/uuid"
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

type UserSetting struct {
	ID        uuid.UUID   `json:"id" gorm:"primary_key"`
	UserID    uuid.UUID   `json:"user_id" gorm:"not null"`
	Key       string      `json:"key" gorm:"not null"`
	Value     interface{} `json:"value" gorm:"not null"`
	CreatedAt time.Time   `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt time.Time   `json:"updated_at" gorm:"autoUpdateTime"`
}

type UserSensor struct {
	ID       uuid.UUID `json:"id" gorm:"primary_key"`
	UserID   uuid.UUID `json:"user_id" gorm:"not null"`
	SensorID uuid.UUID `json:"sensor_id" gorm:"not null"`
}

type UserThermometer struct {
	ID            uuid.UUID `json:"id" gorm:"primary_key"`
	UserID        uuid.UUID `json:"user_id" gorm:"not null"`
	ThermometerID uuid.UUID `json:"thermometer_id" gorm:"not null"`
}
