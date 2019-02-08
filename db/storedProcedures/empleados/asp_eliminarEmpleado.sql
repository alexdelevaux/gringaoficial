--  08/02/2019
-- Fernanda Valle
-- Alejandro Cisneros Delevaux
-- La Gringa

-- creacion: 04/09/2018
-- stored procedure


-- =========	ELIMINAR EMPLEADO - SP	========================================================================


USE `proyecto` ;

DROP PROCEDURE IF EXISTS asp_eliminarEmpleado;
DELIMITER //

CREATE PROCEDURE `asp_eliminarEmpleado` (p_idEmpleado INTEGER)
BEGIN

	IF(p_idEmpleado IS NULL) THEN
		signal sqlstate '45000' set message_text = 'p_idEmpleado null';
	END IF;
    
	IF((SELECT empleados.idEmpleado FROM empleados WHERE empleados.idEmpleado = p_idEmpleado) IS NULL) THEN
		signal sqlstate '45000' set message_text = 'El empleado no existe';
	END IF;
    
    
	IF(( SELECT idventa FROM ventas WHERE  ventas.idEmpleado = p_idEmpleado limit 1 ) IS NOT NULL) THEN
        signal sqlstate '45000' set message_text = 'El empleado tiene ventas asociadas';
	END IF;

	IF(( SELECT idPedido FROM pedidos WHERE pedidos.idEmpleado = p_idEmpleado limit 1 ) IS NOT NULL) THEN
        signal sqlstate '45000' set message_text = 'El empleado tiene pedidos asociadas';
	END IF;
    
	IF(( SELECT idCompra FROM compras WHERE compras.idEmpleado = p_idEmpleado limit 1 ) IS NOT NULL) THEN
        signal sqlstate '45000' set message_text = 'El empleado tiene compras asociadas';
	END IF;

    
    DELETE FROM empleados WHERE empleados.idempleado = p_idEmpleado;
    
    SELECT 'Empleado eliminado con exito' AS 'Exito';

END //


DELIMITER ;


