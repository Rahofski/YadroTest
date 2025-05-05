package main

import (
	"backend/internal/handlers"
	"backend/internal/storage"
	"log"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// Инициализируем хранилище
	storage.InitStorage("pet_data.json")

	// Настраиваем роутер Gin
	r := gin.Default()

    r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"*"},
		AllowMethods:     []string{"GET", "PUT", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
	api := r.Group("/v1")
	{
		api.GET("/pet", handlers.GetPet)
		api.PUT("/pet", handlers.UploadPet)
	}

	// Запускаем сервер
	if err := r.Run(":8000"); err != nil {
		log.Fatalf("Server error: %v", err)
	}
}