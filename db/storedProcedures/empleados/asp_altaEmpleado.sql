-- =====================
-- ALTA EMPLEADO - SP 
-- =====================

--  07/02/2018
-- Fernanda Valle
-- Alejandro Cisneros Delevaux
-- La Gringa

-- creacion: 04/09/2018

-- stored procedure

USE `proyecto` ;


DROP PROCEDURE IF EXISTS asp_altaEmpleado;

DELIMITER //

CREATE PROCEDURE `asp_altaEmpleado` (p_usuario varchar(45), p_contrasena varchar(45), p_nombre varchar(45),
			p_apellido varchar(45), p_estado char(1), p_telefono varchar(15), p_observaciones varchar(100), 
            p_rol char(1))


BEGIN
DECLARE v_idEmpleado INT;

SET v_idEmpleado  = (SELECT MAX(idEmpleado) FROM empleados) + 1;
    
    -- Controla si ya existe un empleado con ese usuario
    IF((SELECT idEmpleado FROM empleados WHERE usuario = p_usuario) IS NOT NULL) THEN
		signal sqlstate '45000' set message_text = 'Ya existe el usuario';
	END IF;
    
    IF(p_nombre IS NULL OR NOT p_nombre REGEXP '^[a-zA-Z]+$') THEN 
        signal sqlstate '45000' set message_text = 'El nombre no puede tener numeros';
    END IF;
    
	IF(p_apellido IS NULL OR NOT p_apellido REGEXP '^[a-zA-Z]+$') THEN 
		signal sqlstate '45000' set message_text = 'El apellido no puede tener numeros';
    END IF;
    
    IF(p_usuario IS NULL OR NOT p_usuario REGEXP '^[a-zA-Z0-9]+$') THEN 
		signal sqlstate '45000' set message_text = 'Usuario invalido';
    END IF;
    
    IF(p_contrasena IS NULL OR NOT p_contrasena REGEXP '^[a-zA-Z0-9]+$') THEN 
		signal sqlstate '45000' set message_text = 'Contrasena invalida';
    END IF;
    

 	IF(p_observaciones IS NULL) THEN 
 		SET p_observaciones = '-';
     END IF;

-- Si le envia null lo pone en Activo
    IF(p_estado IS NULL) THEN 
 		SET p_estado = 'a';
	ELSE
	-- Controla que el estado enviado sea valido
		IF(NOT STRCMP(LOWER(p_estado),'a') = 0 OR STRCMP(LOWER(p_estado),'i') = 0 ) THEN 
			signal sqlstate '45000' set message_text = 'Estado invalido';
		END IF;
    END IF;
    
-- pone rol Vendedor por defecto si no tiene
	IF(p_rol IS NULL) THEN 
 		SET p_rol = 'v';   
	ELSE
	-- controla que el rol sea valido
		IF(NOT STRCMP(LOWER(p_rol),'v') = 0 OR STRCMP(LOWER(p_rol),'a') = 0 ) THEN 
			signal sqlstate '45000' set message_text = 'Rol invalido';
		END IF;
 	END IF;
    
-- Controla el telefono
	IF(p_telefono IS NULL) THEN 
		SET p_telefono = '-';
	ELSE
		IF(NOT p_telefono REGEXP '^[0-9]+$' OR LENGTH(p_telefono) < 7 ) THEN 
			signal sqlstate '45000' set message_text = 'Telefono invalido';
		END IF;
    END IF;

SELECT 'Empleado creado con exito' AS 'Exito';

INSERT INTO `proyecto`.`empleados` (`idEmpleado`, `usuario`, `contrasena`, 
			`nombre`, `apellido`, `estado`, `telefono`,
            `observaciones`, `rol`) 
			VALUES (v_idEmpleado, p_usuario, p_contrasena, p_nombre, p_apellido, 
                    p_estado, p_telefono, p_observaciones, p_rol);

END //

DELIMITER ;


