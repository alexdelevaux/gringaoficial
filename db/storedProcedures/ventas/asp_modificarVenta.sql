-- =======================
-- MODIFICAR VENTA - SP 
-- =======================

--  08/02/2019
-- Fernanda Valle
-- Alejandro Cisneros Delevaux
-- La Gringa

-- creacion: 08/02/2019
-- stored procedure


USE `proyecto` ;


DROP PROCEDURE IF EXISTS asp_modificarVenta;

DELIMITER //

CREATE PROCEDURE `asp_modificarVenta` (
								p_idVenta INT,
								p_idEmpleado INT,
								p_fecha  TIMESTAMP,
								p_total DECIMAL(8,2),
								p_observaciones VARCHAR(50)
								)

BEGIN

DECLARE v_idVenta INT;
DECLARE	v_idEmpleado INT;
DECLARE	v_fecha  TIMESTAMP;
DECLARE	v_total DECIMAL(8,2);
DECLARE	v_observaciones VARCHAR(50);

	
	IF(p_idVenta IS NULL) THEN
		signal sqlstate '45000' set message_text = 'p_idVenta null';
	ELSE 
		SET v_idVenta = p_idVenta;
    END IF;


    IF(p_idEmpleado IS NULL) THEN
			SET v_idEmpleado = (SELECT idEmpleado FROM ventas WHERE idVenta = p_idVenta);
    ELSE
			IF( (SELECT idEmpleado FROM empleados WHERE idempleado = p_idEmpleado ) IS NULL) THEN
				signal sqlstate '45000' set message_text = 'No exitste un empleado con ese id';
			ELSE 
				SET v_idEmpleado = p_idEmpleado;
			END IF;
		END IF;
   
   
	IF(p_fecha IS NOT NULL) THEN
		
		IF(p_fecha > CURRENT_TIMESTAMP()) THEN
			signal sqlstate '45000' set message_text = 'Fecha ingresada futura';
		ELSE
			SET v_fecha = p_fecha;
		END IF;
    ELSE
		SET v_fecha = (SELECT fecha FROM ventas WHERE idVenta = p_idVenta);
    END IF;
    
	
    IF(p_total IS NOT NULL) THEN
		
		IF(NOT p_total REGEXP '^[1-9]+$') THEN
			signal sqlstate '45000' set message_text = 'Total ingresado invalido';
		ELSE
			SET v_total = p_total;
		END IF;
    ELSE
		SET v_total = (SELECT total FROM ventas WHERE idVenta = p_idVenta);
    END IF;
    
    
	IF(p_observaciones IS NULL) THEN 
		SET v_observaciones = (SELECT observaciones FROM ventas WHERE idVenta = p_idVenta);
	ELSE
		SET v_observaciones = p_observaciones; 
	END IF;
    
    
	UPDATE `proyecto`.`ventas` 
	SET 
		`idVenta` = v_idVenta,
		`idEmpleado` = v_idEmpleado,
		`fecha` = v_fecha,
		`total` = v_total,
		`observaciones` = v_observaciones
	WHERE
		`idVenta` = v_idVenta;
    
    SELECT 'Venta modificada con exito' AS 'Exito';
	 
END //

DELIMITER ;
