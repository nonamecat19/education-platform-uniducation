package postgres

import (
	"fmt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log"
	entity "portal-service/internal/domain/entity"
	"portal-service/pkg/config"
)

func buildConnectionString(config config.PostgresConfig) string {
	return fmt.Sprintf("host= %s user=%s password=%s dbname=%s port=%s sslmode=%s TimeZone=%s",
		config.Host, config.User, config.Password, config.DbName, config.Port, config.SSL, config.TimeZone)
}

func migrateTable(entity any, db *gorm.DB) {
	err := db.AutoMigrate(entity)
	if err != nil {
		log.Panic("Error while auto migration", err)
	}
}

func Init(postgresConfig config.PostgresConfig) *gorm.DB {
	url := buildConnectionString(postgresConfig)

	db, err := gorm.Open(postgres.Open(url), &gorm.Config{})

	if err != nil {
		log.Fatalln(err)
	}

	migrateTable(&entity.Student{}, db)
	migrateTable(&entity.Group{}, db)
	migrateTable(&entity.Teacher{}, db)
	migrateTable(&entity.Staff{}, db)

	return db
}
