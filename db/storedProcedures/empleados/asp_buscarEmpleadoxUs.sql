-- =================================
-- BUSCAR EMPLEADO x USUARIO - SP 
-- =================================

--  08/02/2019
-- Fernanda Valle
-- Alejandro Cisneros Delevaux
-- La Gringa

-- creacion: 08/02/2018
-- stored procedure


USE `proyecto` ;

DROP PROCEDURE IF EXISTS asp_buscar_empleado_xuser;


-- Busca empleado por usuario
DELIMITER //

CREATE PROCEDURE `asp_buscar_empleado_xuser`(p_usuario varchar(45))
BEGIN

	IF(p_usuario IS NULL) THEN
		signal sqlstate '45000' set message_text = 'p_usuario null';
	END IF;
    
	IF((SELECT idEmpleado FROM empleados WHERE usuario = p_usuario) IS NULL) THEN
		signal sqlstate '45000' set message_text = 'No existe el empleado';
    END IF;
    
    SELECT * FROM empleados WHERE usuario = p_usuario GROUP BY apellido, nombre;   
    
END //

DELIMITER ;
