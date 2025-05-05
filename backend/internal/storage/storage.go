package storage

import (
	"backend/internal/models"
	"encoding/json"
	"os"
	"sync"
)

var (
	filePath string
	mu       sync.Mutex
)

// Инициализация хранилища
func InitStorage(path string) {
	filePath = path
}

// Сохранить данные
func SavePet(pet *models.Pet) error {
	mu.Lock()
	defer mu.Unlock()

	file, err := os.Create(filePath)
	if err != nil {
		return err
	}
	defer file.Close()

	return json.NewEncoder(file).Encode(pet)
}

// Загрузить данные
func LoadPet() (*models.Pet, error) {
	mu.Lock()
	defer mu.Unlock()

	file, err := os.Open(filePath)
	if err != nil {
		if os.IsNotExist(err) {
			return nil, nil // Файла нет = данных нет
		}
		return nil, err
	}
	defer file.Close()

	var pet models.Pet
	if err := json.NewDecoder(file).Decode(&pet); err != nil {
		return nil, err
	}

	return &pet, nil
}