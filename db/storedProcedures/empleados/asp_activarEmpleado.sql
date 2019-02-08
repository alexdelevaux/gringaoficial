-- =======================
-- ACTIVAR EMPLEADO - SP 
-- =======================


--  08/02/2019
-- Fernanda Valle
-- Alejandro Cisneros Delevaux
-- La Gringa

-- creacion: 08/02/2018
-- stored procedure


USE `proyecto` ;

DROP PROCEDURE IF EXISTS asp_activarEmpleado;
DELIMITER //

CREATE PROCEDURE `asp_activarEmpleado` (p_idEmpleado INTEGER)
BEGIN

	IF(p_idEmpleado IS NULL) THEN
		signal sqlstate '45000' set message_text = 'p_idEmpleado null';
	END IF;
    
	IF((SELECT idEmpleado FROM empleados WHERE idEmpleado = p_idEmpleado) IS NULL) THEN
		signal sqlstate '45000' set message_text = 'No existe el empleado';
	END IF;
    
	IF( (SELECT estado FROM empleados WHERE idEmpleado = p_idEmpleado ) in ('a', 'A')) THEN
		signal sqlstate '45000' set message_text = 'El empleado ya está activado';
	END IF;

	UPDATE empleados
    SET estado = 'a'
    WHERE idEmpleado = p_idEmpleado;
    
    SELECT 'Empleado activado con exito' AS 'Exito';

END //


DELIMITER ;


