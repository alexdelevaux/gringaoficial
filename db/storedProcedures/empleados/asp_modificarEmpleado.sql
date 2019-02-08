-- =========================
-- MODIFICAR EMPLEADO - SP 
-- =========================

--  08/02/2019
-- Fernanda Valle
-- Alejandro Cisneros Delevaux
-- La Gringa

-- creacion: 04/09/2018
-- stored procedure



USE `proyecto` ;


DROP PROCEDURE IF EXISTS asp_modificarEmpleado;

DELIMITER //

CREATE PROCEDURE `asp_modificarEmpleado` (p_idEmpleado int, p_usuario varchar(45), p_contrasena varchar(45),
											p_nombre varchar(45), p_apellido varchar(45), p_estado char(1), 
											p_observaciones varchar(100), p_rol char(1), p_telefono VARCHAR(15))


BEGIN

DECLARE v_apellido varchar(45);
DECLARE v_nombre varchar(45);
DECLARE v_usuario varchar(45);
DECLARE v_contrasena varchar(45);
DECLARE v_telefono varchar(15);
DECLARE v_estado char(1);
DECLARE v_observaciones varchar(100);
DECLARE v_rol char(1);

	IF(p_idEmpleado IS NULL) THEN
		signal sqlstate '45000' set message_text = 'p_idEmpleado null';
	END IF;
    
    IF( (SELECT idempleado FROM empleados WHERE idempleado = p_idEmpleado ) IS NULL) THEN
		signal sqlstate '45000' set message_text = 'No exitste un usuario con ese id';
	END IF;
    
    IF((SELECT idempleado FROM empleados WHERE usuario = p_usuario LIMIT 1) IS NOT NULL) THEN
		IF( (SELECT idempleado FROM empleados WHERE usuario = p_usuario) <> p_idEmpleado) THEN
			signal sqlstate '45000' set message_text = 'El nombre de usuario ya esta en uso';
		END IF;
    END IF;
   
    IF(p_nombre IS NOT NULL) THEN
		
        IF(NOT p_nombre REGEXP '^[a-zA-Z]+$') THEN 		
			signal sqlstate '45000' set message_text = 'El nombre no debe contener numeros';
		ELSE
			SET v_nombre = p_nombre;
    	END IF;
    ELSE
		SET v_nombre = (SELECT nombre FROM empleados WHERE idempleado = p_idEmpleado);
    END IF;
    
	
    IF(p_apellido IS NOT NULL) THEN
        
		IF(NOT p_apellido REGEXP '^[a-zA-Z]+$') THEN 
			signal sqlstate '45000' set message_text = 'El apellido no puede contener numeros';	
			
		ELSE    
			SET v_apellido = p_apellido;
		END IF;
		
    ELSE
		SET v_apellido = (SELECT apellido FROM empleados WHERE idempleado = p_idEmpleado);
    END IF;
    
    
    IF(p_usuario IS NOT NULL) THEN
       
        IF(NOT p_usuario REGEXP '^[a-zA-Z0-9]+$') THEN 
			signal sqlstate '45000' set message_text = 'Usuario invalido';	
		ELSE   
			SET v_usuario = p_usuario;
		END IF;
        
		ELSE
			SET v_usuario = (SELECT usuario FROM empleados WHERE idempleado = p_idEmpleado);
    END IF;
    
    
	IF(p_contrasena IS NOT NULL) THEN
        
		IF(NOT p_contrasena REGEXP '^[a-zA-Z0-9]+$') THEN
			signal sqlstate '45000' set message_text = 'Contrasena invalida';	
		ELSE
			SET v_contrasena = p_contrasena;
		END IF;
    ELSE
			SET v_contrasena = (SELECT contrasena FROM empleados WHERE idempleado = p_idEmpleado);
    END IF;
    
    
    IF(p_estado IS NOT NULL) THEN

		IF(NOT STRCMP(LOWER(p_estado),'a') = 0 OR STRCMP(LOWER(p_estado),'i') = 0 ) THEN 
			signal sqlstate '45000' set message_text = 'Estado invalido';		
		ELSE 
			SET v_estado = p_estado;
	    END IF;
	
    ELSE
		SET v_estado = (SELECT estado FROM empleados WHERE idempleado = p_idEmpleado);
    END IF;
    
    
	IF(p_observaciones IS NOT NULL) THEN
        SET v_observaciones = p_observaciones;
	ELSE
		SET v_observaciones = (SELECT observaciones FROM empleados WHERE idempleado = p_idEmpleado);
    END IF;
    
	
    IF(p_rol IS NOT NULL) THEN
    
		IF(NOT STRCMP(LOWER(p_rol),'v') = 0 OR STRCMP(LOWER(p_rol),'a') = 0 ) THEN 
			signal sqlstate '45000' set message_text = 'Rol invalido';		
		ELSE
			SET v_rol = p_rol;
		END IF;
    ELSE
		SET v_rol = (SELECT rol FROM empleados WHERE idempleado = p_idEmpleado);
    END IF;

-- Control del telefono
	IF(p_telefono IS NOT NULL) THEN 
		IF(NOT p_telefono REGEXP '^[0-9]+$' OR LENGTH(p_telefono) < 6 ) THEN 
			signal sqlstate '45000' set message_text = 'Telefono invalido';		
		ELSE 
			SET v_telefono = p_telefono;
    	END IF;
	ELSE
		SET v_telefono = (SELECT telefono FROM empleados WHERE idempleado = p_idEmpleado);
    END IF;
	
    
	SELECT 'Empleado modificado con exito' AS 'Exito';
    
	UPDATE `proyecto`.`empleados` 
SET 
    `nombre` = v_nombre,
    `apellido` = v_apellido,
    `usuario` = v_usuario,
    `contrasena` = v_contrasena,
    `rol` = v_rol,
    `telefono` = v_telefono,
    `estado` = v_estado,
    `observaciones` = v_observaciones
WHERE
    `idEmpleado` = p_idEmpleado;
	 
END //

DELIMITER ;

-- #####################################################################################


