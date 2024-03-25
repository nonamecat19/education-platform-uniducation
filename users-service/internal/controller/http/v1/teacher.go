package v1

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"net/http"
	"users/internal/domain/entity"
)

type teachersHandler struct {
	DB *gorm.DB
}

func RegisterTeachersRoutes(r *gin.Engine, db *gorm.DB) {
	h := &teachersHandler{
		DB: db,
	}

	routes := r.Group("/teachers")
	routes.POST("/", h.AddTeacher)
	routes.GET("/", h.GetTeachers)
	routes.GET("/:id", h.GetTeacherById)
	routes.PUT("/:id", h.UpdateTeacher)
	routes.DELETE("/:id", h.DeleteTeacher)
}

func (h *teachersHandler) AddTeacher(c *gin.Context) {
	var group entity.Teacher
	if err := c.BindJSON(&group); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := h.DB.Create(&group).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Teacher added successfully"})
}

func (h *teachersHandler) GetTeachers(c *gin.Context) {
	var group []entity.Teacher
	if err := h.DB.Find(&group).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, group)
}

func (h *teachersHandler) GetTeacherById(c *gin.Context) {
	var group entity.Teacher
	id := c.Param("id")
	if err := h.DB.First(&group, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Teacher not found"})
		return
	}

	c.JSON(http.StatusOK, group)
}

func (h *teachersHandler) UpdateTeacher(c *gin.Context) {
}

func (h *teachersHandler) DeleteTeacher(c *gin.Context) {
	var requestBody struct {
		ID string `json:"id"`
	}
	if err := c.BindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var group entity.Teacher
	if err := h.DB.First(&group, requestBody.ID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Teacher not found"})
		return
	}

	if err := h.DB.Delete(&group).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Teacher deleted successfully"})
}
