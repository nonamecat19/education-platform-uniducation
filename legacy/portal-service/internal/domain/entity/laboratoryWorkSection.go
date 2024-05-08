package entity

import "gorm.io/gorm"

type LaboratoryWorkSection struct {
	gorm.Model
	UnitID int    `json:"UnitID,omitempty"`
	Unit   Unit   `json:"Unit,omitempty" gorm:"foreignKey:UnitID"`
	Name   string `json:"Name,omitempty"`
}
