package entity

import "gorm.io/gorm"

type Teacher struct {
	gorm.Model
	Name       string `json:"Name"`
	Surname    string `json:"Surname"`
	Patronymic string `json:"Patronymic"`
	Email      string `json:"Email"`
	Profession string `json:"Profession"`
	Password   string `json:"Password"`
}
