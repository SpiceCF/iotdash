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

func (s *Sensor) BeforeCreate(tx *gorm.DB) error {
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

func (s *SensorConfig) BeforeCreate(tx *gorm.DB) error {
	s.ID = uuid.New()
	return nil
}

type SensorLog struct {
	ID         uuid.UUID      `json:"id" gorm:"primary_key"`
	DeviceID   uuid.UUID      `json:"device_id" gorm:"not null"`
	SensorType SensorType     `json:"sensor_type" gorm:"not null"`
	Value      datatypes.JSON `json:"value" gorm:"not null"`
	Timestamp  time.Time      `json:"timestamp" gorm:"not null"`
}

func (s *SensorLog) BeforeCreate(tx *gorm.DB) error {
	s.ID = uuid.New()
	return nil
}
