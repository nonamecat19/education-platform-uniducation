package service

import (
	"context"
	"users/internal/domain/entity"
	"users/internal/utils"
)

type StudentsStorage interface {
	GetOne(id string) (entity.Student, error)
	GetAll(meta utils.ListMetadata) ([]entity.Student, error)
	GetCount() (int, error)
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

func (s StudentsService) GetAll(ctx context.Context, meta utils.ListMetadata) ([]entity.Student, error) {
	return s.storage.GetAll(meta)
}

func (s StudentsService) GetCount(ctx context.Context) (int, error) {
	return s.storage.GetCount()
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
