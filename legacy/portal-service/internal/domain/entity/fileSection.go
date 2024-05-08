package entity

import "gorm.io/gorm"

type FileSection struct {
	gorm.Model
	UnitID      int    `json:"UnitID,omitempty"`
	Unit        Unit   `json:"Unit,omitempty" gorm:"foreignKey:UnitID"`
	Description string `json:"Description"`
	Path        string `json:"Path,omitempty"`
}
