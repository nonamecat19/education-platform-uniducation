package config

type Config struct {
	App      AppConfig
	Postgres PostgresConfig
	Redis    RedisConfig
}

type AppConfig struct {
	Port string `mapstructure:"PORT"`
}

type PostgresConfig struct {
	Port     string `mapstructure:"PGPORT"`
	User     string `mapstructure:"POSTGRES_USER"`
	Password string `mapstructure:"POSTGRES_PASSWORD"`
	DbName   string `mapstructure:"POSTGRES_DB"`
	Host     string `mapstructure:"POSTGRES_HOSTNAME"`
	SSL      string `mapstructure:"POSTGRES_SSL"`
	TimeZone string `mapstructure:"POSTGRES_TIMEZONE"`
}

type RedisConfig struct {
}
