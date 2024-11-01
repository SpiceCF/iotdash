package domain

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/datatypes"
	"gorm.io/gorm"
)

type SensorType string

const (
	SensorTypeThermometer SensorType = "thermometer"
)

type SensorStatus string

const (
	// Thermometer.
	ThermometerStatusNormal   SensorStatus = "normal"
	ThermometerStatusWarning  SensorStatus = "warning"
	ThermometerStatusCritical SensorStatus = "critical"
)

type Sensor struct {
	ID        uuid.UUID       `json:"id" gorm:"primary_key"`
	OwnerID   uuid.UUID       `json:"owner_id" gorm:"not null"`
	DeviceID  uuid.UUID       `json:"device_id" gorm:"not null"`
	Name      string          `json:"name" gorm:"not null"`
	Type      SensorType      `json:"type" gorm:"not null"`
	Configs   []*SensorConfig `json:"configs" gorm:"foreignKey:SensorID;references:ID;"`
	CreatedAt time.Time       `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt time.Time       `json:"updated_at" gorm:"autoUpdateTime"`
}

func (s *Sensor) BeforeCreate(_ *gorm.DB) error {
	s.ID = uuid.New()
	return nil
}

type SensorConfig struct {
	ID        uuid.UUID      `json:"id" gorm:"primary_key"`
	SensorID  uuid.UUID      `json:"sensor_id" gorm:"not null"`
	Key       string         `json:"key" gorm:"not null"`
	Value     datatypes.JSON `json:"value" gorm:"not null"`
	CreatedAt time.Time      `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt time.Time      `json:"updated_at" gorm:"autoUpdateTime"`
}

func (s *SensorConfig) BeforeCreate(_ *gorm.DB) error {
	s.ID = uuid.New()
	return nil
}

type SensorLog struct {
	ID         uuid.UUID  `json:"id" gorm:"primary_key"`
	DeviceID   uuid.UUID  `json:"device_id" gorm:"not null" example:"123e4567-e89b-12d3-a456-426614174000"`
	SensorType SensorType `json:"sensor_type" gorm:"not null" example:"thermometer"`
	Key        string     `json:"key" gorm:"not null" example:"temperature"`
	Value      float64    `json:"value" gorm:"not null" example:"25.5"`
	// Refactor name to CreatedAt
	Timestamp time.Time `json:"timestamp" gorm:"not null" example:"2024-10-29T22:40:03.410461+07:00"`
}

func (s *SensorLog) BeforeCreate(_ *gorm.DB) error {
	s.ID = uuid.New()
	return nil
}

type SensorFactor (SensorType)
