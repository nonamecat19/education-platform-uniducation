package main

import (
	"github.com/gin-gonic/gin"
	v1 "users/internal/controller/http/v1"
	"users/pkg/config"
	"users/pkg/db/postgres"
)

func main() {
	appConfig, _ := config.LoadConfig()
	db := postgres.Init(appConfig.Postgres)

	r := gin.Default()
	v1.RegisterStudentsRoutes(r, db)
	v1.RegisterGroupsRoutes(r, db)
	v1.RegisterTeachersRoutes(r, db)
	v1.RegisterStaffsRoutes(r, db)

	_ = r.Run(":" + appConfig.App.Port)
}
