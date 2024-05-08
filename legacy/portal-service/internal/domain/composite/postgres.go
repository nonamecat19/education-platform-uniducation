package composite

import (
	"gorm.io/gorm"
	"portal-service/pkg/config"
	"portal-service/pkg/db/postgres"
)

type PostgresComposite struct {
	db *gorm.DB
}

func NewPostgresComposite() (*PostgresComposite, error) {
	appConfig, _ := config.LoadConfig()
	client := postgres.Init(appConfig.Postgres)
	return &PostgresComposite{db: client}, nil
}
