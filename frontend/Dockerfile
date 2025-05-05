# Установка зависимостей
FROM node:18 as build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install

# Сборка
COPY frontend ./
ENV VITE_API_URL=http://localhost:8000/v1
RUN npm run build

# Запуск
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]