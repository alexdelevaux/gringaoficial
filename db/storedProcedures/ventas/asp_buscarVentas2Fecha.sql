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

DROP PROCEDURE IF EXISTS asp_buscar_ventas_fechas;


DELIMITER //

CREATE PROCEDURE asp_buscar_ventas_fechas (p_fecha1 TIMESTAMP, p_fecha2 TIMESTAMP)

BEGIN

	IF(p_fecha1 IS NULL) THEN
		signal sqlstate '45000' set message_text = 'Fecha 1 null';
	END IF;

	IF(p_fecha2 IS NULL) THEN
		signal sqlstate '45000' set message_text = 'Fecha 1 null';
	END IF;

	IF(p_fecha1 > CURRENT_TIMESTAMP()) THEN
		signal sqlstate '45000' set message_text = 'Fecha1 ingresada futura';
	END IF;
	
    
	IF(p_fecha2 > CURRENT_TIMESTAMP()) THEN
		signal sqlstate '45000' set message_text = 'Fecha2 ingresada futura';
	END IF;
    
    
-- Verdadero = 1
-- Falso = 0
	IF(p_fecha1 > p_fecha2) THEN
		signal sqlstate '45000' set message_text = 'Fechas en orden incorrecto';
	END IF;
    
	

	SELECT *
	FROM ventas
    WHERE fecha BETWEEN p_fecha1 AND p_fecha2
    ORDER BY fecha DESC;

END //

DELIMITER ;