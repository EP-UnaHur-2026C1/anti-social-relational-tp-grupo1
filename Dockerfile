FROM node:20-alpine

WORKDIR /app

# Copiar archivos de dependencias primero (capa caché)
COPY package*.json ./
RUN npm install --production

# Copiar el resto del código
COPY . .

# Crear directorio para la base de datos SQLite
RUN mkdir -p /app/data

EXPOSE 3000

CMD ["node", "src/main.js"]
