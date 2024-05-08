package entity

import "gorm.io/gorm"

type Student struct {
	gorm.Model
	ID         uint64 `gorm:"primaryKey"`
	Name       string `json:"Name"`
	Surname    string `json:"Surname"`
	Patronymic string `json:"Patronymic"`
	Group      Group  `json:"Group,omitempty" gorm:"foreignKey:GroupID"`
	GroupID    int    `gorm:"index" json:"GroupID,omitempty"`
	Email      string `json:"Email"`
	StudentId  string `json:"StudentIdNumber"`
	Password   string `json:"Password"`
}
