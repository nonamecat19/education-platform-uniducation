package entity

import "gorm.io/gorm"

type Course struct {
	gorm.Model
	GroupSubjectID int `json:"GroupSubjectID,omitempty"`
	TeacherID      int `json:"TeacherID,omitempty"`
}
