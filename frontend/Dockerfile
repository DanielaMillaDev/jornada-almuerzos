# Utilizar una imagen base de Node.js
FROM node:latest

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

# Comando por defecto para iniciar la aplicación de React
CMD ["npm", "start"]

