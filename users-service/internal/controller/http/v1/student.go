package v1

import (
	"github.com/gin-gonic/gin"
	"net/http"
	httpdto "users/internal/controller/http/dto"
	studentusecase "users/internal/domain/usecase/student"
)

type H map[string]any

type StudentsHandler struct {
	studentsUsecase studentusecase.StudentUsecase
}

func NewStudentsHandler(r *gin.Engine, studentUsecase studentusecase.StudentUsecase) {
	h := &StudentsHandler{studentsUsecase: studentUsecase}

	routes := r.Group("/students")
	routes.POST("/", h.AddStudent)
	routes.GET("/", h.GetStudents)
	routes.GET("/:id", h.GetStudentById)
	routes.PUT("/:id", h.UpdateStudent)
	routes.DELETE("/:id", h.DeleteStudent)
}

// AddStudent   godoc
// @Summary     Create student
// @Description Add student to db
// @Produce     application/json
// @Tags        Students
// @Router      /students/ [post]
func (h StudentsHandler) AddStudent(c *gin.Context) {
	var student httpdto.AddStudentDTO
	if err := c.BindJSON(&student); err != nil {
		// @Failure 404 {object} gin.H{"error": "Student not found"} "Invalid request body"
		c.JSON(http.StatusBadRequest, H{"error": err.Error()})
		return
	}

	mappedStudent := studentusecase.AddStudentDTO{
		Name:       student.Name,
		Surname:    student.Surname,
		Patronymic: student.Patronymic,
		GroupID:    student.GroupID,
		Email:      student.Email,
		StudentID:  student.StudentID,
		Password:   student.Password,
	}

	if err := h.studentsUsecase.AddStudent(c, mappedStudent); err != nil {
		// @Failure 500 {object} gin.H{"error": "Internal Server Error"} "Failed to add student"
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// @Success 201 {object} gin.H{"message": "Student added successfully"} "Successfully added student"
	response := gin.H{"message": "Student added successfully"}
	c.JSON(http.StatusCreated, response)
}

// GetStudents  godoc
// @Summary     Get students
// @Description Get students array
// @Produce     application/json
// @Tags        Students
// @Router      /students/ [get]
func (h StudentsHandler) GetStudents(c *gin.Context) {
	students, err := h.studentsUsecase.GetStudentsList(c)
	if err != nil {
		// @Failure 500 {object} gin.H{"error": "Internal Server Error"} "Failed to add student"
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	// @Success 200 {array} Student "Successfully retrieved students"
	c.JSON(http.StatusOK, students)
}

// GetStudentById  godoc
// @Summary     Get student
// @Description Get student by ID
// @Produce     application/json
// @Tags        Students
// @Param		id path string true "student id"
// @Router      /students/{id} [get]
func (h StudentsHandler) GetStudentById(c *gin.Context) {
	id := c.Param("id")
	student, err := h.studentsUsecase.GetStudentById(c, id)
	if err != nil {
		// @Failure 404 {object} gin.H{"error": "Student not found"} "Invalid request body"
		c.JSON(http.StatusNotFound, gin.H{"error": "Student not found"})
		return
	}
	// @Success 200 {object} Student "Successfully retrieved students"
	c.JSON(http.StatusOK, student)
}

func (h StudentsHandler) UpdateStudent(c *gin.Context) {
}

// DeleteStudent godoc
// @Summary      Delete student
// @Description  Delete student by id
// @Produce      application/json
// @Tags         Students
// @Router       /students/ [delete]
func (h StudentsHandler) DeleteStudent(c *gin.Context) {
	var requestBody struct {
		ID string `json:"id"`
	}
	if err := c.BindJSON(&requestBody); err != nil {
		// @Failure 400 {object} gin.H{"error": "Bad request exception"} "Bad request exception"
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := h.studentsUsecase.DeleteStudent(c, requestBody.ID)
	if err != nil {
		// @Failure 500 {object} gin.H{"error": "Internal Server Error"} "Internal Server Error"
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// @Success 200 {object} gin.H{"message": "Student deleted successfully"} "Student deleted successfully"
	c.JSON(http.StatusOK, gin.H{"message": "Student deleted successfully"})
}
