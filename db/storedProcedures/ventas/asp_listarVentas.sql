-- =======================
-- LISTAR VENTAS - SP 
-- =======================

--  09/02/2019
-- Fernanda Valle
-- Alejandro Cisneros Delevaux
-- La Gringa

-- creacion: 09/02/2019
-- stored procedure

USE `proyecto` ;

DROP PROCEDURE IF EXISTS asp_listar_ventas;


DELIMITER //

CREATE PROCEDURE asp_listar_ventas ()

BEGIN

	SELECT *
	FROM ventas
    ORDER BY fecha DESC;

END //

DELIMITER ;