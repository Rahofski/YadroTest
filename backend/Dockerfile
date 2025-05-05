# Билд
FROM golang:1.23 AS builder
WORKDIR /app
COPY backend/go.mod backend/go.sum ./
RUN go mod download
COPY backend ./
RUN CGO_ENABLED=0 GOOS=linux go build -o backend ./cmd/main.go

# Запуск
FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/backend .
COPY --from=builder /app/cmd/pet_data.json .
EXPOSE 8000
CMD ["./backend"]