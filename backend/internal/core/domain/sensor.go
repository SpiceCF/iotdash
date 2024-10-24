package domain

import (
	"time"

	"github.com/google/uuid"
)

type SensorType string

const (
	SensorTypeThermometer SensorType = "thermometer"
)

type SensorStatus string

const (
	// Thermometer
	ThermometerStatusNormal   SensorStatus = "normal"
	ThermometerStatusWarning  SensorStatus = "warning"
	ThermometerStatusCritical SensorStatus = "critical"
)

type Sensor struct {
	ID        uuid.UUID      `json:"id" gorm:"primary_key"`
	Type      SensorType     `json:"type" gorm:"not null"`
	Configs   []SensorConfig `json:"configs" gorm:"foreignKey:SensorID"`
	CreatedAt time.Time      `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt time.Time      `json:"updated_at" gorm:"autoUpdateTime"`
}

type SensorConfig struct {
	ID        uuid.UUID   `json:"id" gorm:"primary_key"`
	SensorID  uuid.UUID   `json:"sensor_id" gorm:"not null"`
	Key       string      `json:"key" gorm:"not null"`
	Value     interface{} `json:"value" gorm:"not null"`
	CreatedAt time.Time   `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt time.Time   `json:"updated_at" gorm:"autoUpdateTime"`
}

type SensorLog struct {
	ID         uuid.UUID   `json:"id" gorm:"primary_key"`
	SensorID   uuid.UUID   `json:"sensor_id" gorm:"not null"`
	SensorType SensorType  `json:"sensor_type" gorm:"not null"`
	Value      interface{} `json:"value" gorm:"not null"`
	Timestamp  time.Time   `json:"timestamp" gorm:"not null"`
}