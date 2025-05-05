package handlers

import (
	"backend/internal/models"
	"backend/internal/storage"
	"net/http"

	"github.com/gin-gonic/gin"
)

// GET /pet
func GetPet(c *gin.Context) {
	pet, err := storage.LoadPet()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
		return
	}

	if pet == nil {
		c.Status(http.StatusNoContent)
		return
	}

	c.JSON(http.StatusOK, pet)
}

// PUT /pet
func UploadPet(c *gin.Context) {
	var pet models.Pet

	// Валидация входных данных
	if err := c.ShouldBindJSON(&pet); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Сохранение в файл
	if err := storage.SavePet(&pet); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save pet"})
		return
	}

	c.Status(http.StatusOK)
}