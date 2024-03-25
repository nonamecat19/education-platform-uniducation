package student_usecase

import (
	"context"
	"users/internal/domain/entity"
	"users/internal/domain/service"
)

type StudentUsecase struct {
	studentService service.StudentsService
}

func NewStudentUsecase(studentService service.StudentsService) StudentUsecase {
	return StudentUsecase{studentService: studentService}
}

func (u StudentUsecase) GetStudentsList(ctx context.Context) ([]entity.Student, error) {
	return u.studentService.GetAll(ctx)
}

func (u StudentUsecase) GetStudentById(ctx context.Context, id string) (entity.Student, error) {
	return u.studentService.GetOneById(ctx, id)
}

func (u StudentUsecase) AddStudent(ctx context.Context, student AddStudentDTO) error {
	s := entity.Student{
		Name:       student.Name,
		Surname:    student.Surname,
		Patronymic: student.Patronymic,
		GroupID:    student.GroupID,
		Email:      student.Email,
		StudentId:  student.StudentID,
		Password:   student.Password,
	}
	return u.studentService.InsertOne(ctx, s)
}

func (u StudentUsecase) UpdateStudent(ctx context.Context, student UpdateStudentDTO) error {
	//return u.studentService.UpdateOne(ctx, student)
	panic("not implemented")
}

func (u StudentUsecase) DeleteStudent(ctx context.Context, id string) error {
	return u.studentService.DeleteOne(ctx, id)
}
