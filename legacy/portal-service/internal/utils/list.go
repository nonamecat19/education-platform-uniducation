package utils

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"math"
	"strconv"
)

type ListMetadata struct {
	Page     int
	PageSize int
}

type ListResponse[T any] struct {
	Data    []T
	MaxPage int
	Count   int
}

func CollectListMetadata(ctx *gin.Context) ListMetadata {
	pageStr := ctx.DefaultQuery("page", "1")
	page, _ := strconv.Atoi(pageStr)
	if page <= 0 {
		page = 1
	}

	pageSizeStr := ctx.DefaultQuery("page_size", "10")
	pageSize, _ := strconv.Atoi(pageSizeStr)
	switch {
	case pageSize > 100:
		pageSize = 100
	case pageSize <= 0:
		pageSize = 10
	}

	return ListMetadata{
		Page:     page,
		PageSize: pageSize,
	}
}

func Paginate(meta ListMetadata) func(db *gorm.DB) *gorm.DB {
	return func(db *gorm.DB) *gorm.DB {
		offset := (meta.Page - 1) * meta.PageSize
		return db.Offset(offset).Limit(meta.PageSize)
	}
}

func CalculateMaxPage(count int, pageSize int) int {
	return int(math.Ceil(float64(count) / float64(pageSize)))
}
