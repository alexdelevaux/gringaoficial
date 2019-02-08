-- ===========================
-- BUSCAR EMPLEADO x ID- SP 
-- ===========================

--  08/02/2019
-- Fernanda Valle
-- Alejandro Cisneros Delevaux
-- La Gringa

-- creacion: 08/02/2018
-- stored procedure


USE `proyecto` ;

DROP PROCEDURE IF EXISTS asp_buscar_empleado_xid;

DELIMITER //

CREATE PROCEDURE `asp_buscar_empleado_xid`(p_idEmpleado INTEGER)
BEGIN

	IF(p_idEmpleado IS NULL) THEN
		signal sqlstate '45000' set message_text = 'p_idEmpleado null';
	END IF;
    
	IF((SELECT idEmpleado FROM empleados WHERE idEmpleado = p_idEmpleado) IS NULL) THEN
		signal sqlstate '45000' set message_text = 'No existe el empleado';
	END IF;
    
    SELECT * FROM empleados WHERE idempleado = p_idEmpleado;   
    
END //

DELIMITER ;