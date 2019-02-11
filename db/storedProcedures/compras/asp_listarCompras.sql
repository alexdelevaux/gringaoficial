-- =======================
-- LISTAR COMPRAS - SP 
-- =======================

--  09/02/2019
-- Fernanda Valle
-- Alejandro Cisneros Delevaux
-- La Gringa

-- creacion: 09/02/2019
-- stored procedure

USE `proyecto` ;

DROP PROCEDURE IF EXISTS asp_listar_compras;


DELIMITER //

CREATE PROCEDURE asp_listar_compras ()

BEGIN

	SELECT *
	FROM compras
    ORDER BY fecha DESC;

END //

DELIMITER ;