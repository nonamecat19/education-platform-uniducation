package service

import (
	"context"
	"users/internal/domain/entity"
)

type StudentsStorage interface {
	GetOne(id string) (entity.Student, error)
	GetAll() ([]entity.Student, error)
	InsertOne(student entity.Student) error
	DeleteOne(id string) error
}

type StudentsService struct {
	storage StudentsStorage
}

func NewStudentsService(storage StudentsStorage) StudentsService {
	return StudentsService{storage: storage}
}

func (s StudentsService) Create(ctx context.Context, student entity.Student) error {
	return s.storage.InsertOne(student)
}

func (s StudentsService) GetAll(ctx context.Context) ([]entity.Student, error) {
	return s.storage.GetAll()
}

func (s StudentsService) GetOneById(ctx context.Context, id string) (entity.Student, error) {
	return s.storage.GetOne(id)
}

func (s StudentsService) InsertOne(ctx context.Context, student entity.Student) error {
	return s.storage.InsertOne(student)
}

func (s StudentsService) DeleteOne(ctx context.Context, id string) error {
	return s.storage.DeleteOne(id)
}
