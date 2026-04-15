FROM node:20-alpine

WORKDIR /app

# Копируем зависимости и устанавливаем их
COPY package*.json ./
RUN npm install

# Копируем остальной код
COPY . .

# Открываем порт Vite
EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]