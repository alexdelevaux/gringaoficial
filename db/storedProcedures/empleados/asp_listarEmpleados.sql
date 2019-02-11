-- =======================
-- LISTAR EMPLEADOS - SP 
-- =======================

-- 09/02/2019
-- Fernanda Valle
-- Alejandro Cisneros Delevaux
-- La Gringa

--  creacion: 09/02/2019
-- stored procedure

USE `proyecto` ;

DROP PROCEDURE IF EXISTS asp_listar_empleados;


DELIMITER //

CREATE PROCEDURE asp_listar_empleados ()

BEGIN

	SELECT * FROM empleados
    ORDER BY apellido, nombre, estado ASC;

END //

DELIMITER ;