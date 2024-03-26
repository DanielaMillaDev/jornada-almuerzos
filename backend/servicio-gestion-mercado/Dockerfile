# Usa una imagen base de Node.js
FROM node:latest

# Establece el directorio de trabajo en /src
WORKDIR /src

# Copia el archivo package.json al directorio de trabajo
COPY package.json .

# Copia el archivo .env al directorio de trabajo
COPY .env .

# Instala las dependencias
RUN npm install

# Copia todo el contenido al directorio de trabajo
COPY . .

# Expone el puerto 3000 para que se pueda acceder desde fuera del contenedor
EXPOSE 3004

# Comando por defecto para ejecutar la aplicación
CMD ["npm", "start"]
