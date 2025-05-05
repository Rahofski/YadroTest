package models

type Pet struct {
	ASCII       string `json:"ascii" binding:"required,min=1"`
	Description string `json:"description" binding:"required,min=1"`
}