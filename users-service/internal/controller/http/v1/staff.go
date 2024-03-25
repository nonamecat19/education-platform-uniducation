package v1

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"net/http"
	"users/internal/domain/entity"
)

type staffsHandler struct {
	DB *gorm.DB
}

func RegisterStaffsRoutes(r *gin.Engine, db *gorm.DB) {
	h := &staffsHandler{
		DB: db,
	}

	routes := r.Group("/staffs")
	routes.POST("/", h.AddStaff)
	routes.GET("/", h.GetStaffs)
	routes.GET("/:id", h.GetStaffById)
	routes.PUT("/:id", h.UpdateStaff)
	routes.DELETE("/:id", h.DeleteStaff)
}

func (h *staffsHandler) AddStaff(c *gin.Context) {
	var staff entity.Staff
	if err := c.BindJSON(&staff); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := h.DB.Create(&staff).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Staff added successfully"})
}

func (h *staffsHandler) GetStaffs(c *gin.Context) {
	var staff []entity.Staff
	if err := h.DB.Find(&staff).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, staff)
}

func (h *staffsHandler) GetStaffById(c *gin.Context) {
	var staff entity.Staff
	id := c.Param("id")
	if err := h.DB.First(&staff, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Staff not found"})
		return
	}

	c.JSON(http.StatusOK, staff)
}

func (h *staffsHandler) UpdateStaff(c *gin.Context) {
}

func (h *staffsHandler) DeleteStaff(c *gin.Context) {
	var requestBody struct {
		ID string `json:"id"`
	}
	if err := c.BindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var staff entity.Staff
	if err := h.DB.First(&staff, requestBody.ID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Staff not found"})
		return
	}

	if err := h.DB.Delete(&staff).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Staff deleted successfully"})
}
