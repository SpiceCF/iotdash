package sqlite

import (
	"iotdash/backend/internal/core/domain"
	"iotdash/backend/internal/core/port"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

var _ port.ThermometerRepository = &ThermometerRepository{}

type ThermometerRepository struct {
	db *gorm.DB
}

func NewThermometerRepository(db *gorm.DB) *ThermometerRepository {
	return &ThermometerRepository{db: db}
}

func (r *ThermometerRepository) Create(thermometer *domain.Thermometer) error {
	return r.db.Create(thermometer).Error
}

func (r *ThermometerRepository) Update(thermometer *domain.Thermometer) error {
	return r.db.Model(thermometer).Select("IsActive", "Name", "OwnerID", "Config").Updates(thermometer).Error
}

func (r *ThermometerRepository) GetByID(id uuid.UUID) (*domain.Thermometer, error) {
	var thermometer domain.Thermometer
	if err := r.db.Where(&domain.Thermometer{ID: id}).First(&thermometer).Error; err != nil {
		return nil, err
	}
	return &thermometer, nil
}

func (r *ThermometerRepository) ListByOwnerID(ownerID uuid.UUID) ([]*domain.Thermometer, error) {
	var thermometers []*domain.Thermometer
	if err := r.db.Where(&domain.Thermometer{OwnerID: ownerID}).Find(&thermometers).Error; err != nil {
		return nil, err
	}
	return thermometers, nil
}
