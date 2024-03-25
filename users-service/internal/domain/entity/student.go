package entity

import "gorm.io/gorm"

type Student struct {
	gorm.Model
	Name       string `json:"Name"`
	Surname    string `json:"Surname"`
	Patronymic string `json:"Patronymic"`
	GroupID    int    `json:"GroupID,omitempty"`
	Group      Group  `json:"Group,omitempty" gorm:"foreignKey:GroupID"`
	Email      string `json:"Email"`
	StudentId  string `json:"StudentIdNumber"`
	Password   string `json:"Password"`
}
