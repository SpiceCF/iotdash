package domain

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type ThermometerConfig struct {
	Connection     string  `json:"connection" gorm:"not null" example:"http://localhost:8080/api/v1/sensors/thermometer/logs"`
	MinTemperature float64 `json:"min_temperature" gorm:"not null" example:"10"`
	MaxTemperature float64 `json:"max_temperature" gorm:"not null" example:"100"`
}

type Thermometer struct {
	ID          uuid.UUID         `json:"id" gorm:"primary_key"`
	OwnerID     uuid.UUID         `json:"owner_id" gorm:"not null"`
	IPAddress   string            `json:"ip_address" gorm:"not null"`
	Connected   bool              `json:"connected" gorm:"not null"`
	Temperature float64           `json:"temperature" gorm:"not null"`
	Config      ThermometerConfig `json:"config" gorm:"embedded;embeddedPrefix:config_"`
	IsActive    bool              `json:"is_active" gorm:"not null"`
	CreatedAt   time.Time         `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt   time.Time         `json:"updated_at" gorm:"autoUpdateTime"`
}

func (t *Thermometer) BeforeCreate(_ *gorm.DB) error {
	t.ID = uuid.New()
	return nil
}

type ThermometerHistory struct {
	ID            uuid.UUID `json:"id" gorm:"primary_key" example:"123e4567-e89b-12d3-a456-426614174000"`
	ThermometerID uuid.UUID `json:"thermometer_id" gorm:"not null" example:"123e4567-e89b-12d3-a456-426614174000"`
	Temperature   float64   `json:"temperature" gorm:"not null" example:"25.5"`
	Timestamp     time.Time `json:"timestamp" gorm:"autoCreateTime" example:"2024-10-29T22:40:03.410461+07:00"`
}

func (t *ThermometerHistory) BeforeCreate(_ *gorm.DB) error {
	t.ID = uuid.New()
	return nil
}
