package config

func LoadConfig() (c Config, err error) {
	loadEnvFile("app", &c.App)
	loadEnvFile("postgres", &c.Postgres)
	return
}
