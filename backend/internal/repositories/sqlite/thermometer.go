package sqlite

import (
	"iotdash/backend/internal/entity"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type IThermometerRepository interface {
	Create(tm *entity.Thermometer) error
	Update(tm *entity.Thermometer) error
	GetByID(id uuid.UUID) (*entity.Thermometer, error)
	ListByOwnerID(ownerID uuid.UUID) ([]*entity.Thermometer, error)
	GetHistoryByThermometerID(id uuid.UUID) ([]*entity.ThermometerHistory, error)
	AddThermometerHistory(history *entity.ThermometerHistory) error
	ListActiveThermometers() ([]*entity.Thermometer, error)
}

var _ IThermometerRepository = (*ThermometerRepository)(nil)

type ThermometerRepository struct {
	db *gorm.DB
}

func NewThermometerRepository(db *gorm.DB) *ThermometerRepository {
	return &ThermometerRepository{db: db}
}

func (r *ThermometerRepository) Create(thermometer *entity.Thermometer) error {
	return r.db.Create(thermometer).Error
}

func (r *ThermometerRepository) Update(thermometer *entity.Thermometer) error {
	return r.db.Save(thermometer).Error
}

func (r *ThermometerRepository) GetByID(id uuid.UUID) (*entity.Thermometer, error) {
	var thermometer entity.Thermometer
	if err := r.db.Where(&entity.Thermometer{ID: id}).First(&thermometer).Error; err != nil {
		return nil, err
	}
	return &thermometer, nil
}

func (r *ThermometerRepository) ListByOwnerID(ownerID uuid.UUID) ([]*entity.Thermometer, error) {
	var thermometers []*entity.Thermometer
	if err := r.db.Where(&entity.Thermometer{OwnerID: ownerID}).Find(&thermometers).Error; err != nil {
		return nil, err
	}
	return thermometers, nil
}

const historyLimit = 10

func (r *ThermometerRepository) GetHistoryByThermometerID(id uuid.UUID) ([]*entity.ThermometerHistory, error) {
	var history []*entity.ThermometerHistory
	if err := r.db.Where(&entity.ThermometerHistory{ThermometerID: id}).
		Order("timestamp desc").
		Limit(historyLimit).
		Find(&history).
		Error; err != nil {
		return nil, err
	}
	return history, nil
}

func (r *ThermometerRepository) ListActiveThermometers() ([]*entity.Thermometer, error) {
	var thermometers []*entity.Thermometer
	if err := r.db.Where(&entity.Thermometer{IsActive: true}).Find(&thermometers).Error; err != nil {
		return nil, err
	}
	return thermometers, nil
}

func (r *ThermometerRepository) AddThermometerHistory(history *entity.ThermometerHistory) error {
	return r.db.Create(history).Error
}
