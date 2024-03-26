# Jornada Almuerzos Microservicios NodeJs-React

## Descripción del Proyecto

Este proyecto consiste en la creación de una aplicación para gestionar la jornada de almuerzo gratis ofrecida por un restaurante. 

## Tecnologías Utilizadas

- Node.js: Para el desarrollo del backend y los microservicios.
- Express.js: Para la creación de la API REST.
- MySQL: Base de datos relacional para almacenar la información sobre pedidos, ingredientes y compras.
- React.js: Para la creación del frontend de la aplicación.
- Tailwind CSS: Framework de diseño CSS utilizado para la interfaz de usuario.
- Docker: Para la contenerización de los microservicios y la base de datos.

## Estructura del Proyecto

El proyecto se divide en varios microservicios, cada uno con una funcionalidad específica:

1. **Servicio de Pedidos**: Gestiona los pedidos solicitados por el gerente del restaurante.
2. **Servicio de Cocina**: Se encarga de preparar los platos solicitados por el servicio de pedidos.
3. **Servicio de Bodega**: Administra los ingredientes disponibles y realiza compras en la plaza de mercado.
4. **Servicio de Plaza de Mercado**: Simula la interacción con la plaza de mercado para comprar ingredientes.

## Pasos para Iniciar el Proyecto

### Requisitos Previos

- Node.js instalado en tu sistema.
- Docker instalado y configurado en tu máquina.

### Pasos

1. **Clonar el Repositorio**: Clona el repositorio privado desde GitHub.
   git clone <url-del-repositorio>

2. **Ejecutar contenedor Docker**: Para iniciar el proyecto ejecutar
   docker-compose up d 
