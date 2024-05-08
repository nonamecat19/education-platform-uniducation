package main

import (
	"github.com/gin-gonic/gin"
	"log"
	v1 "portal-service/internal/controller/http/v1"
	"portal-service/internal/domain/composite"
	"portal-service/pkg/config"
	"portal-service/pkg/db/postgres"
)

func main() {
	appConfig, _ := config.LoadConfig()
	db := postgres.Init(appConfig.Postgres)

	r := gin.Default()

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
