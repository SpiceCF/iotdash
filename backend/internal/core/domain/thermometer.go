package domain

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type ThermometerConfig struct {
	Connection     string  `json:"connection" gorm:"not null"`
	MinTemperature float64 `json:"min_temperature" gorm:"not null"`
	MaxTemperature float64 `json:"max_temperature" gorm:"not null"`
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

func (t *Thermometer) BeforeCreate(tx *gorm.DB) error {
	t.ID = uuid.New()
	return nil
}
