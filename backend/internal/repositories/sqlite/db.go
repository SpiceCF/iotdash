package sqlite

import (
	"iotdash/backend/internal/entity"

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
		&entity.User{},
		&entity.Thermometer{},
		&entity.ThermometerHistory{},
		&entity.Sensor{},
		&entity.SensorLog{},
		&entity.SensorConfig{},
		&entity.UserSetting{},
	); err != nil {
		return nil, err
	}

	if err = db.AutoMigrate(
		&entity.Thermometer{},
		&entity.ThermometerHistory{},
		&entity.User{},
		&entity.Sensor{},
		&entity.SensorLog{},
		&entity.SensorConfig{},
		&entity.UserSetting{},
	); err != nil {
		return nil, err
	}

	return db, nil
}
