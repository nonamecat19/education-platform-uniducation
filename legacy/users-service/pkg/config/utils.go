package config

import (
	"github.com/spf13/viper"
	"log"
)

func loadEnvFile(name string, destination any) {
	viper.Reset()
	viper.AddConfigPath("./env")
	viper.SetConfigName(name)
	viper.SetConfigType("env")
	viper.AutomaticEnv()

	err := viper.ReadInConfig()

	if err != nil {
		log.Panic(err)
		return
	}
	err = viper.Unmarshal(destination)
}
