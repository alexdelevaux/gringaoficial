-- ==================
-- NUEVA VENTA - SP 
-- ==================

-- 11/02/2019
-- Fernanda Valle
-- Alejandro Cisneros Delevaux
-- La Gringa

--  creacion: 08/02/2019
-- stored procedure

USE `proyecto` ;


DROP PROCEDURE IF EXISTS asp_nuevaVenta;

DELIMITER //

CREATE PROCEDURE `asp_nuevaVenta` (
								p_idEmpleado INT,
								p_fecha  TIMESTAMP,
								p_total DECIMAL(8,2),
								p_observaciones VARCHAR(50)
								)

BEGIN

DECLARE p_idVenta INT;

SET p_idVenta  = (SELECT MAX(idVenta) FROM ventas) + 1;
    
	IF(p_idEmpleado IS NULL) THEN 
        signal sqlstate '45000' set message_text = 'p_idEmpleado null';
	ELSE
        IF((SELECT idEmpleado FROM empleados WHERE idEmpleado = p_idEmpleado) IS NULL) THEN
        signal sqlstate '45000' set message_text = 'Empleado inexistente';
	END IF;
    
    
	IF(p_fecha IS NULL) THEN 
        SET p_fecha = CURRENT_TIMESTAMP();
	ELSE
		IF(p_fecha > CURRENT_TIMESTAMP()) THEN
			signal sqlstate '45000' set message_text = 'Fecha ingresada futura';
        END IF;
    END IF;
    
    -- Controlar lo que es decimal. Da error y que no sea negativo
    IF(NOT p_total REGEXP '^[1-9]+$') THEN
        signal sqlstate '45000' set message_text = 'Total ingresado invalido';
	ELSE
		IF(p_total IS NULL) THEN 
			SET p_total = 0;
		END IF;
    END IF;
    
    
	IF(p_observaciones IS NULL) THEN 
 		SET p_observaciones = '-';
	END IF;


	INSERT INTO `proyecto`.`ventas`
		(`idVenta`, `idEmpleado`, `fecha`, `total`, `observaciones`)
	VALUES (p_idVenta, p_idEmpleado, p_fecha, p_total, p_observaciones);


SELECT 'Venta creada con exito' AS 'Exito';

END //

DELIMITER ;
