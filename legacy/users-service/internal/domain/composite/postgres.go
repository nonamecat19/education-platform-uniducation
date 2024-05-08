package composite

import (
	"gorm.io/gorm"
	"users/pkg/config"
	"users/pkg/db/postgres"
)

type PostgresComposite struct {
	db *gorm.DB
}

func NewPostgresComposite() (*PostgresComposite, error) {
	appConfig, _ := config.LoadConfig()
	client := postgres.Init(appConfig.Postgres)
	return &PostgresComposite{db: client}, nil
}
