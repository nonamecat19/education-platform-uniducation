package entity

import "gorm.io/gorm"

type TextSection struct {
	gorm.Model
	UnitID      int    `json:"UnitID,omitempty"`
	Unit        Unit   `json:"Unit,omitempty" gorm:"foreignKey:UnitID"`
	Name        string `json:"Name,omitempty"`
	Description string `json:"Description"`
}
