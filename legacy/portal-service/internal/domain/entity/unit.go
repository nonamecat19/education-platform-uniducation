package entity

import "gorm.io/gorm"

type Unit struct {
	gorm.Model
	CourseID    int    `json:"CourseID"`
	Name        string `json:"Name"`
	Description string `json:"Description"`
}
