--  26/011/2018
-- Fernanda Valle
-- La Gringa

-- stored procedure de prueba para integracion con REST API

USE `proyecto` ;


-- =========	SP asp_cambioNombre	=============================================================


DROP PROCEDURE IF EXISTS asp_cambioNombre;

DELIMITER //

CREATE PROCEDURE `asp_cambioNombre` (id INTEGER, nombre varchar(45))


SALIR : BEGIN

	UPDATE `proyecto`.`empleados` 
	SET 
	`nombre` = nombre
	WHERE (`idEmpleado` = id);

END //

DELIMITER ;




