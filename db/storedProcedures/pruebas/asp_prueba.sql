--  26/011/2018
-- Fernanda Valle
-- La Gringa

-- stored procedure de prueba para integracion con REST API

USE `proyecto` ;


-- =========	SP asp_prueba	=============================================================


DROP PROCEDURE IF EXISTS asp_pruebaNombre;

DELIMITER //

CREATE PROCEDURE `asp_pruebaNombre` (parametro varchar(45))


SALIR : BEGIN


INSERT INTO `proyecto`.`empleados` (`idEmpleado`, `nombre`, `apellido`, `usuario`, `contrasena`, `rol`, `telefono`, `estado`, `observaciones`) VALUES ('80', parametro, 'vallejo', 'eugeniova', 'eugeniova123', 'v', '3815478965', 'a', 'sin comentarios');

END //

DELIMITER ;




