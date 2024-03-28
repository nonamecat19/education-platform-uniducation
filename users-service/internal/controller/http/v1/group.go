package v1

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"net/http"
	"users/internal/domain/entity"
)

type groupsHandler struct {
	DB *gorm.DB
}

func RegisterGroupsRoutes(r *gin.Engine, db *gorm.DB) {
	h := &groupsHandler{
		DB: db,
	}

	routes := r.Group("/groups")
	routes.POST("/", h.AddGroup)
	routes.GET("/", h.GetGroups)
	routes.GET("/:id", h.GetGroupById)
	routes.PUT("/:id", h.UpdateGroup)
	routes.DELETE("/:id", h.DeleteGroup)
}

// AddGroup     godoc
// @Summary     Add group
// @Description Add group
// @Produce     application/json
// @Tags        Groups
// @Router      /groups/ [post]
func (h *groupsHandler) AddGroup(c *gin.Context) {
	var group entity.Group
	if err := c.BindJSON(&group); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := h.DB.Create(&group).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Group added successfully"})
}

// GetGroups    godoc
// @Summary     Get groups
// @Description Get groups array
// @Produce     application/json
// @Tags        Groups
// @Router      /groups/ [get]
func (h *groupsHandler) GetGroups(c *gin.Context) {
	var group []entity.Group
	if err := h.DB.Find(&group).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, group)
}

// GetGroupById godoc
// @Summary     Get group
// @Description Get group by ID
// @Produce     application/json
// @Param		id path string true "group id"
// @Tags        Groups
// @Router      /groups/{id} [get]
func (h *groupsHandler) GetGroupById(c *gin.Context) {
	var group entity.Group
	id := c.Param("id")
	if err := h.DB.First(&group, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Group not found"})
		return
	}

	c.JSON(http.StatusOK, group)
}

func (h *groupsHandler) UpdateGroup(c *gin.Context) {
}

// DeleteGroup  godoc
// @Summary     Delete group
// @Description Delete group by id
// @Produce     application/json
// @Tags        Groups
// @Router      /groups/ [delete]
func (h *groupsHandler) DeleteGroup(c *gin.Context) {
	var requestBody struct {
		ID string `json:"id"`
	}
	if err := c.BindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var group entity.Group
	if err := h.DB.First(&group, requestBody.ID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Group not found"})
		return
	}

	if err := h.DB.Delete(&group).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Group deleted successfully"})
}
