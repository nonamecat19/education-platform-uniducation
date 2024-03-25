package v1

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"net/http"
	"users/internal/domain/entity"
)

type studentsHandler struct {
	DB *gorm.DB
}

func RegisterStudentsRoutes(r *gin.Engine, db *gorm.DB) {
	h := &studentsHandler{
		DB: db,
	}

	routes := r.Group("/students")
	routes.POST("/", h.AddStudent)
	routes.GET("/", h.GetStudents)
	routes.GET("/:id", h.GetStudentById)
	routes.PUT("/:id", h.UpdateStudent)
	routes.DELETE("/:id", h.DeleteStudent)
}

func (h *studentsHandler) AddStudent(c *gin.Context) {
	var student entity.Student
	if err := c.BindJSON(&student); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := h.DB.Create(&student).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Student added successfully"})
}

func (h *studentsHandler) GetStudents(c *gin.Context) {
	var students []entity.Student
	if err := h.DB.Find(&students).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, students)
}

func (h *studentsHandler) GetStudentById(c *gin.Context) {
	var student entity.Student
	id := c.Param("id")
	if err := h.DB.First(&student, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Student not found"})
		return
	}

	c.JSON(http.StatusOK, student)
}

func (h *studentsHandler) UpdateStudent(c *gin.Context) {
	//	id := c.Param("id")
	//	var requestBody struct {
	//		Name       string `json:"Name"`
	//		Surname    string `json:"Surname"`
	//		Patronymic string `json:"Patronymic"`
	//		GroupID    string `json:"GroupId"`
	//		Email      string `json:"Email"`
	//		StudentID  string `json:"StudentIdNumber"`
	//		Password   string `json:"Password"`
	//	}
	//	if err := c.BindJSON(&requestBody); err != nil {
	//		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	//		return
	//	}
	//
	//	var student entity.Student
	//	if err := h.DB.First(&student, id).Error; err != nil {
	//		c.JSON(http.StatusNotFound, gin.H{"error": "Student not found"})
	//		return
	//	}
	//
	//	student.Name = requestBody.Name
	//	student.Surname = requestBody.Surname
	//	student.Patronymic = requestBody.Patronymic
	//	student.GroupId = requestBody.GroupID
	//	student.Email = requestBody.Email
	//	student.StudentId = requestBody.StudentID
	//	student.Password = requestBody.Password
	//
	//	if err := h.DB.Save(&student).Error; err != nil {
	//		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	//		return
	//	}
	//
	//	c.JSON(http.StatusOK, gin.H{"message": "Student updated successfully"})
}

func (h *studentsHandler) DeleteStudent(c *gin.Context) {
	var requestBody struct {
		ID string `json:"id"`
	}
	if err := c.BindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var student entity.Student
	if err := h.DB.First(&student, requestBody.ID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Student not found"})
		return
	}

	if err := h.DB.Delete(&student).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Student deleted successfully"})
}
