
--  17/12/2018
-- Fernanda Valle
-- La Gringa

-- stored procedure de prueba para integracion con REST API
-- Especificamente prueba el insert autoincrementable para que
-- en Node pueda utilizar el result de la promesa y ver el insertId
-- Ademas, el select con el error con el alias, se muestra en node, entonces sirve
-- para debbugear

USE `proyecto` ;


-- =========	SP asp_altaEmpleado_idAI	=============================================================


DROP PROCEDURE IF EXISTS asp_altaEmpleado_idAI;

DELIMITER //

CREATE PROCEDURE `asp_altaEmpleado_idAI`(p_usuario varchar(45), p_contrasena varchar(45), p_nombre varchar(45),
			p_apellido varchar(45), p_estado char(1), p_telefono varchar(15), p_observaciones varchar(100), 
            p_rol char(1))
SALIR : BEGIN
DECLARE p_id INT;

-- SET p_id  = (SELECT MAX(idEmpleado) FROM empleados) + 1;
    
    -- Controla si ya existe un empleado con ese usuario
    IF((SELECT idEmpleado FROM empleados WHERE usuario = p_usuario) IS NOT NULL) THEN
		SELECT 'Ya exitste el usuario' as 'Usuario';
        LEAVE SALIR;
	END IF;
    
    IF(p_nombre IS NULL OR NOT p_nombre REGEXP '^[a-zA-Z]+$') THEN 
        select 'El nombre no puede tener numeros 'as 'Nombre';
        LEAVE SALIR;
        
    END IF;
    
	IF(p_apellido IS NULL OR NOT p_apellido REGEXP '^[a-zA-Z]+$') THEN 
		SELECT 'El apellido debe contener solo letras' as 'Apellido';
        LEAVE SALIR;
    END IF;
    
    IF(p_usuario IS NULL OR NOT p_usuario REGEXP '^[a-zA-Z0-9]+$') THEN 
		SELECT 'Usuario invalido' as 'Usuario';
        LEAVE SALIR;
    END IF;
    
    IF(p_contrasena IS NULL OR NOT p_contrasena REGEXP '^[a-zA-Z0-9]+$') THEN 
		SELECT 'Contrasena invalida' as 'Contrasena';
        LEAVE SALIR;
    END IF;
    

 	IF(p_observaciones IS NULL) THEN 
 		SET p_observaciones = '-';
     END IF;

-- Si le envia null lo pone en Activo
     IF(p_estado IS NULL) THEN 
 		SET p_estado = 'a';
 	END IF;
    
-- Controla que el estado enviado sea valido
    IF(NOT STRCMP(LOWER(p_estado),'a') = 0 OR STRCMP(LOWER(p_estado),'i') = 0 ) THEN 
		SELECT 'Estado invalido' as 'Estado';
        LEAVE SALIR;
    END IF;
    
-- pone rol Vendedor por defecto	
     IF(p_rol IS NULL) THEN 
 		SET p_rol = 'v';
 	END IF;
    
-- controla que el rol sea valido
    IF(NOT STRCMP(LOWER(p_rol),'v') = 0 OR STRCMP(LOWER(p_rol),'a') = 0 ) THEN 
        LEAVE SALIR;
    END IF;
	
    
	IF(p_telefono IS NULL) THEN 
		SET p_telefono = '-';
	END IF;

	IF(NOT p_telefono REGEXP '^[0-9]+$' OR LENGTH(p_telefono) < 7 ) THEN 
		SELECT 'Telefono invalido' as 'Telefono';
        LEAVE SALIR;
    END IF;


INSERT INTO `proyecto`.`empleados` (`usuario`, `contrasena`, 
			`nombre`, `apellido`, `estado`, `telefono`,
            `observaciones`, `rol`) 
			VALUES (p_usuario, p_contrasena, p_nombre, p_apellido, 
                    p_estado, p_telefono, p_observaciones, p_rol);

END //

DELIMITER ;