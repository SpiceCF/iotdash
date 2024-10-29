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

	db = db.Debug()
	db.Migrator().DropTable(
		// &domain.User{},
		&domain.Thermometer{},
		&domain.Sensor{},
		&domain.SensorLog{},
		&domain.SensorConfig{},
		&domain.UserSetting{},
	)
	db.AutoMigrate(
		&domain.Thermometer{},
		&domain.User{},
		&domain.Sensor{},
		&domain.SensorLog{},
		&domain.SensorConfig{},
		&domain.UserSetting{},
	)

	return db, nil
}
