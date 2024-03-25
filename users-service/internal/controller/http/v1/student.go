package v1

import (
	"github.com/gin-gonic/gin"
	"net/http"
	http_dto "users/internal/controller/http/dto"
	student_usecase "users/internal/domain/usecase/student"
)

type StudentsHandler struct {
	studentsUsecase student_usecase.StudentUsecase
}

func NewStudentsHandler(r *gin.Engine, studentUsecase student_usecase.StudentUsecase) {
	h := &StudentsHandler{studentsUsecase: studentUsecase}

	routes := r.Group("/students")
	routes.POST("/", h.AddStudent)
	routes.GET("/", h.GetStudents)
	routes.GET("/:id", h.GetStudentById)
	routes.PUT("/:id", h.UpdateStudent)
	routes.DELETE("/:id", h.DeleteStudent)
}

func (h StudentsHandler) AddStudent(c *gin.Context) {
	var student http_dto.AddStudentDTO
	if err := c.BindJSON(&student); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	mappedStudent := student_usecase.AddStudentDTO{
		Name:       student.Name,
		Surname:    student.Surname,
		Patronymic: student.Patronymic,
		GroupID:    student.GroupID,
		Email:      student.Email,
		StudentID:  student.StudentID,
		Password:   student.Password,
	}

	if err := h.studentsUsecase.AddStudent(c, mappedStudent); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Student added successfully"})
}

func (h StudentsHandler) GetStudents(c *gin.Context) {
	students, err := h.studentsUsecase.GetStudentsList(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, students)
}

func (h StudentsHandler) GetStudentById(c *gin.Context) {
	id := c.Param("id")
	student, err := h.studentsUsecase.GetStudentById(c, id)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Student not found"})
		return
	}
	c.JSON(http.StatusOK, student)
}

func (h StudentsHandler) UpdateStudent(c *gin.Context) {
}

func (h StudentsHandler) DeleteStudent(c *gin.Context) {
	var requestBody struct {
		ID string `json:"id"`
	}
	if err := c.BindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := h.studentsUsecase.DeleteStudent(c, requestBody.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Student deleted successfully"})
}
