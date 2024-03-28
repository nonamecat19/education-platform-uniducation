package postgres

import (
	"fmt"
	"gorm.io/gorm"
	"log"
	"users/internal/domain/entity"
	"users/internal/utils"
)

type StudentsStorage struct {
	db *gorm.DB
}

func NewStudentsStorage(db *gorm.DB) StudentsStorage {
	return StudentsStorage{db: db}
}

func (ss StudentsStorage) GetOne(id string) (entity.Student, error) {
	var student entity.Student
	if err := ss.db.First(&student, id).Error; err != nil {
		log.Print(err)
		return student, fmt.Errorf("student not found")
	}
	return student, nil
}

func (ss StudentsStorage) GetAll(meta utils.ListMetadata) ([]entity.Student, error) {
	var student []entity.Student
	if err := ss.db.Scopes(utils.Paginate(meta)).Find(&student).Error; err != nil {
		log.Print(err)
		return nil, fmt.Errorf("error while getting students list")
	}
	return student, nil
}

func (ss StudentsStorage) GetCount() (int, error) {
	var count int64
	if err := ss.db.Model(&entity.Student{}).Count(&count).Error; err != nil {
		return 0, err
	}
	return int(count), nil
}

func (ss StudentsStorage) InsertOne(student entity.Student) error {
	if err := ss.db.Create(&student).Error; err != nil {
		log.Print(err)
		return fmt.Errorf("error while student create")
	}
	return nil
}

func (ss StudentsStorage) DeleteOne(id string) error {
	var student entity.Student
	if err := ss.db.First(&student, id).Error; err != nil {
		log.Print(err)
		return fmt.Errorf("student not found")
	}

	if err := ss.db.Delete(&student).Error; err != nil {
		log.Print(err)
		return fmt.Errorf("error while student delete")
	}
	return nil
}
