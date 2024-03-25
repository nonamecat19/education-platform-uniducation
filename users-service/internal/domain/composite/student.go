package composite

import (
	"github.com/gin-gonic/gin"
	"users/internal/adapters/db/postgres"
	"users/internal/controller/http/v1"
	"users/internal/domain/service"
	"users/internal/domain/usecase/student"
)

type StudentComposite struct {
	Storage postgres.StudentsStorage
	Service service.StudentsService
	Usecase student_usecase.StudentUsecase
}

func NewStudentComposite(postgresComposite PostgresComposite, r *gin.Engine) (StudentComposite, error) {
	storage := postgres.NewStudentsStorage(postgresComposite.db)
	compositeService := service.NewStudentsService(storage)
	usecase := student_usecase.NewStudentUsecase(compositeService)
	v1.NewStudentsHandler(r, usecase)
	return StudentComposite{
		Storage: storage,
		Service: compositeService,
		Usecase: usecase,
	}, nil
}
