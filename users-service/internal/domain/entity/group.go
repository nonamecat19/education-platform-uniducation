package entity

import "gorm.io/gorm"

type Group struct {
	gorm.Model
	Name      string  `json:"Name"`
	Course    uint    `json:"Course"`
	CuratorID int     `json:"CuratorID,omitempty"`
	Curator   Teacher `json:"Curator,omitempty" gorm:"foreignKey:CuratorID"`
}
