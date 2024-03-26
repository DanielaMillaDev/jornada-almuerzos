-- Crear la base de datos si es necesario
CREATE DATABASE IF NOT EXISTS my_database;

-- Crear el usuario my_user
CREATE USER 'my_user'@'localhost' IDENTIFIED BY 'my_password';

-- Otorgar todos los privilegios al usuario my_user
GRANT ALL PRIVILEGES ON *.* TO 'my_user'@'localhost' WITH GRANT OPTION;

-- Aplicar los cambios
FLUSH PRIVILEGES;

-- Usar la base de datos
USE my_database;

-- Tabla de estado de pedido
CREATE TABLE estado_pedido (
    id_estado INT AUTO_INCREMENT PRIMARY KEY,
    estado VARCHAR(255)
);

-- Tabla estado de plato
CREATE TABLE estado_plato (
    id_estado_plato INT AUTO_INCREMENT PRIMARY KEY,
    estado VARCHAR(255) 
);

-- Tabla de pedido
CREATE TABLE pedido (
    id_pedido INT AUTO_INCREMENT PRIMARY KEY,
    id_estado INT,
    cantidad_platos INT,
    FOREIGN KEY (id_estado) REFERENCES estado_pedido(id_estado)
);

-- Tabla de ingredientes
CREATE TABLE ingredientes (
    id_ingrediente INT AUTO_INCREMENT PRIMARY KEY,
    ingrediente VARCHAR(255),
    cantidad_ingredientes INT
);

-- Tabla de recetas
CREATE TABLE recetas (
    id_receta INT AUTO_INCREMENT PRIMARY KEY,
    receta VARCHAR(255) COLLATE utf8mb4_spanish_ci
);



-- Tabla de plato
CREATE TABLE plato (
    id_plato INT AUTO_INCREMENT PRIMARY KEY,
    id_pedido INT,
    id_receta INT,
    id_estado_plato INT,
    numero_plato INT,
    FOREIGN KEY (id_estado_plato) REFERENCES estado_plato(id_estado_plato),
    FOREIGN KEY (id_pedido) REFERENCES pedido(id_pedido),
    FOREIGN KEY (id_receta) REFERENCES recetas(id_receta)
);

-- Tabla solicitudes a bodega
CREATE TABLE bodega_solicitudes (
  id_solicitud_bodega INT AUTO_INCREMENT PRIMARY KEY,
  id_receta INT,
  id_plato INT,
  FOREIGN KEY (id_receta) REFERENCES recetas(id_receta),
  FOREIGN KEY (id_plato) REFERENCES plato(id_plato)
);

-- Tabla de recetas e ingredientes
CREATE TABLE recetas_ingredientes (
    id_receta_ingrediente INT AUTO_INCREMENT PRIMARY KEY,
    id_receta INT,
    id_ingrediente INT,
    FOREIGN KEY (id_receta) REFERENCES recetas(id_receta),
    FOREIGN KEY (id_ingrediente) REFERENCES ingredientes(id_ingrediente)
);

-- Tabla de compras de mercado
CREATE TABLE mercado_compras (
    id_compra INT AUTO_INCREMENT PRIMARY KEY,
    id_ingrediente INT,
    cantidad_compra INT,
    fecha_compra DATETIME,
    FOREIGN KEY (id_ingrediente) REFERENCES ingredientes(id_ingrediente)
);

CREATE TABLE cantidad_platos (
  id_cantidad INT AUTO_INCREMENT PRIMARY KEY,
  cantidad_maxima INT 
);


START TRANSACTION;

INSERT INTO cantidad_platos (cantidad_maxima)
SELECT n FROM (
    SELECT (ones.n + tens.n * 10 + hundreds.n * 100) AS n
    FROM (SELECT 0 AS n UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) AS ones
    CROSS JOIN (SELECT 0 AS n UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) AS tens
    CROSS JOIN (SELECT 0 AS n UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) AS hundreds
) AS numbers
WHERE n BETWEEN 1 AND 50;

INSERT INTO estado_pedido (estado) VALUES 
    ('Pendiente'),
    ('En Proceso'),
    ('Listo'),
    ('Entregado');

INSERT INTO estado_plato (estado) VALUES 
    ('Receta Seleccionada'),
    ('Solicitud Ingredientes'),
    ('Ingredientes Listos'),
    ('Plato Listo');


INSERT INTO recetas (receta) VALUES
('Ensalada de Pollo'),
('Sándwich de Queso y Tomate'),
('Arroz con Pollo'),
('Ensalada César'),
('Papas Fritas con Ketchup'),
('Hamburguesa Clásica');

INSERT INTO ingredientes(ingrediente,cantidad_ingredientes) 
VALUES 
    ('Tomato',5),
    ('Lemon',5),
    ('Potato',5),
    ('Rice',5),
    ('Ketchup',5),
    ('Lettuce',5),
    ('Onion',5),
    ('Cheese',5),
    ('Meat',5),
    ('Chicken',5);

    INSERT INTO recetas_ingredientes (id_receta, id_ingrediente)
VALUES
    (1, 6), -- Ensalada de Pollo: Lettuce
    (1, 1), -- Ensalada de Pollo: Tomato
    (1, 10), -- Ensalada de Pollo: Chicken
    (1, 7), -- Ensalada de Pollo: Onion
    (2, 8), -- Sándwich de Queso y Tomate: Cheese
    (2, 1), -- Sándwich de Queso y Tomate: Tomato
    (3, 4), -- Arroz con Pollo: Rice
    (3, 10), -- Arroz con Pollo: Chicken
    (3, 7), -- Arroz con Pollo: Onion
    (3, 1), -- Arroz con Pollo: Tomato
    (4, 6), -- Ensalada César: Lettuce
    (4, 10), -- Ensalada César: Chicken
    (4, 8), -- Ensalada César: Cheese
    (4, 2), -- Ensalada César: Lemon
    (5, 3), -- Papas Fritas con Ketchup: Potato
    (5, 5), -- Papas Fritas con Ketchup: Ketchup
    (6, 9), -- Hamburguesa Clásica: Meat
    (6, 8), -- Hamburguesa Clásica: Cheese
    (6, 6), -- Hamburguesa Clásica: Lettuce
    (6, 1), -- Hamburguesa Clásica: Tomato
    (6, 7); -- Hamburguesa Clásica: Onion

COMMIT;

START TRANSACTION;

DELIMITER //

CREATE PROCEDURE `ComprarYActualizarIngrediente`(
    IN p_id_ingrediente INT,
    IN p_cant_compra INT
)
BEGIN
    DECLARE p_fecha_compra DATETIME;
    SET p_fecha_compra = NOW();

    -- Insertar nueva compra
    INSERT INTO mercado_compras (id_ingrediente, cantidad_compra, fecha_compra) VALUES (p_id_ingrediente, p_cant_compra, p_fecha_compra); 
    
    -- Actualizar la cantidad del ingrediente
    UPDATE ingredientes
    SET cantidad_ingredientes = cantidad_ingredientes + p_cant_compra
    WHERE id_ingrediente = p_id_ingrediente;
END//

DELIMITER ;

DELIMITER //

CREATE PROCEDURE `EntregarPlatoYActualizarPedido`(
    IN p_id_plato INT,
    IN p_id_pedido INT
)
BEGIN
    DECLARE platos_pendientes INT;
    DECLARE ingredientes_suficientes INT; 
    SET ingredientes_suficientes = 1;
    

    -- Verificar si hay suficientes ingredientes
	SELECT 
	    CASE WHEN SUM(CASE WHEN ing.cantidad_ingredientes > 0 THEN 1 ELSE 0 END) = COUNT(*) THEN 1 ELSE 0 END
	INTO ingredientes_suficientes
	FROM recetas_ingredientes AS rec_ing
	INNER JOIN ingredientes AS ing ON rec_ing.id_ingrediente = ing.id_ingrediente
	WHERE rec_ing.id_receta = (SELECT id_receta FROM plato WHERE id_plato = p_id_plato);


    IF ingredientes_suficientes = 1 THEN
        -- Reducir la cantidad de ingredientes de la bodega
        UPDATE ingredientes AS ing
        INNER JOIN recetas_ingredientes AS rec_ing ON ing.id_ingrediente = rec_ing.id_ingrediente
        INNER JOIN plato AS p ON rec_ing.id_receta = p.id_receta
        SET ing.cantidad_ingredientes = ing.cantidad_ingredientes - 1
        WHERE p.id_plato = p_id_plato
        AND ing.cantidad_ingredientes > 0;

        -- Actualizar el estado del plato a 4 (Plato Listo)
        UPDATE plato
        SET id_estado_plato = 4
        WHERE id_plato = p_id_plato;

        -- Obtener la cantidad de platos pendientes
        SELECT COUNT(*)
        INTO platos_pendientes
        FROM plato
        WHERE id_pedido = p_id_pedido AND id_estado_plato != 4;

        -- Si no hay platos pendientes en el pedido, actualizar el estado del pedido a 3 (Entregado)
        IF platos_pendientes = 0 THEN
            UPDATE pedido
            SET id_estado = 3
            WHERE id_pedido = p_id_pedido;
        END IF;
     ELSE 
     	SET ingredientes_suficientes = 0;
    END IF;
    
        -- Asignar el valor de ingredientes_suficientes_local al parámetro de salida
        
    SELECT ingredientes_suficientes as salida;
END//

DELIMITER ;

DELIMITER //

CREATE PROCEDURE `EnviarIngredientesPlato`(
    IN p_id_plato INT
)
BEGIN
    -- Actualizar el estado del plato a 3 (Ingredientes Listos)
    UPDATE plato
    SET id_estado_plato = 3
    WHERE id_plato = p_id_plato;
END//

DELIMITER ;

DELIMITER //

CREATE PROCEDURE `InsertarPlatoYActualizarPedido`(
    IN p_id_pedido INT,
    IN p_id_receta INT,
    IN p_numero_plato INT
)
BEGIN
    DECLARE p_id_plato INT; 
    
    -- Insertar el nuevo plato
    INSERT INTO plato (id_pedido, id_receta, id_estado_plato, numero_plato) VALUES (p_id_pedido, p_id_receta, 1, p_numero_plato);
    
    -- Obtener el ID del Ãºltimo plato insertado
    SET p_id_plato =  LAST_INSERT_ID();
    
    -- Actualizar el estado del pedido a 2 (En Proceso)
    UPDATE pedido
    SET id_estado = 2
    WHERE id_pedido = p_id_pedido;
END//

DELIMITER ;

DELIMITER //

CREATE PROCEDURE `InsertarSolicitudBodegaYActualizarPedido`(
    IN p_id_receta INT,
    IN p_id_plato INT,
    IN p_id_pedido INT
)
BEGIN
    -- Insertar la solicitud a la bodega
    INSERT INTO bodega_solicitudes (id_receta, id_plato) VALUES (p_id_receta, p_id_plato); 
    
    -- Actualizar el estado del plato a 2 (Solicitud Ingredientes)
    UPDATE plato
    SET id_estado_plato = 2
    WHERE id_plato = p_id_plato;
END//

DELIMITER ;

DELIMITER //
CREATE PROCEDURE `CrearSolicitudPedido`(
    IN p_id_estado INT,
    IN p_cant_platos INT
)
BEGIN

    -- Insertar nueva compra
    INSERT INTO pedido (id_estado, cantidad_platos)
    VALUES (p_id_estado, p_cant_platos); 
    
  
END//

DELIMITER ;

DELIMITER //
CREATE PROCEDURE `EntregarPedido`(
    IN p_id_pedido INT
)
BEGIN
    -- Actualizar el estado del pedido a 4 (Entregado)
    UPDATE pedido
    SET id_estado = 4
    WHERE id_pedido = p_id_pedido;
END//

DELIMITER ;

COMMIT;
