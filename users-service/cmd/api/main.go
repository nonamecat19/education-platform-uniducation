package main

import (
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	"log"
	_ "users/docs"
	v1 "users/internal/controller/http/v1"
	"users/internal/domain/composite"
	"users/pkg/config"
	"users/pkg/db/postgres"
)

// @title       Users Service API
// @version     1.0
// @description Microservice for students, groups, teachers and staff

// @host        localhost:3001
// @BasePath    /
func main() {
	appConfig, _ := config.LoadConfig()
	db := postgres.Init(appConfig.Postgres)

	r := gin.Default()
	r.GET("/docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	postgresComposite, err := composite.NewPostgresComposite()
	if err != nil {
		log.Fatal(err)
	}

	if _, err = composite.NewStudentComposite(*postgresComposite, r); err != nil {
		log.Fatal(err)
	}

	v1.RegisterGroupsRoutes(r, db)
	v1.RegisterTeachersRoutes(r, db)
	v1.RegisterStaffsRoutes(r, db)

	_ = r.Run(":" + appConfig.App.Port)
}
