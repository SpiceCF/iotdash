package sqlite

import (
	"iotdash/backend/internal/core/domain"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func NewDB(dsn string) (*gorm.DB, error) {
	if dsn == "" {
		dsn = ":memory:"
	}

	db, err := gorm.Open(sqlite.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	// db = db.Debug()
	if err = db.Migrator().DropTable(
		&domain.User{},
		&domain.Thermometer{},
		&domain.ThermometerHistory{},
		&domain.Sensor{},
		&domain.SensorLog{},
		&domain.SensorConfig{},
		&domain.UserSetting{},
	); err != nil {
		return nil, err
	}

	if err = db.AutoMigrate(
		&domain.Thermometer{},
		&domain.ThermometerHistory{},
		&domain.User{},
		&domain.Sensor{},
		&domain.SensorLog{},
		&domain.SensorConfig{},
		&domain.UserSetting{},
	); err != nil {
		return nil, err
	}

	return db, nil
}
