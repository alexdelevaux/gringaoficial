-- =======================
-- MODIFICAR COMPRA - SP 
-- =======================

-- 11/02/2019
-- Fernanda Valle
-- Alejandro Cisneros Delevaux
-- La Gringa

-- creacion: 11/02/2019
-- stored procedure

USE `proyecto` ;


DROP PROCEDURE IF EXISTS asp_modificarCompra;

DELIMITER //

CREATE PROCEDURE `asp_modificarCompra` (
                                p_idProveedor INT,
                                p_idPedido INT,
								p_idEmpleado INT,
								p_fecha  TIMESTAMP,
								p_total DECIMAL(8,2),
								p_observaciones VARCHAR(50)
								)

BEGIN

DECLARE v_idCompra INT;
DECLARE v_idProveedor INT;
DECLARE v_idPedido INT;
DECLARE	v_idEmpleado INT;
DECLARE	v_fecha  TIMESTAMP;
DECLARE	v_total DECIMAL(8,2);
DECLARE	v_observaciones VARCHAR(50);


	IF(p_idCompra IS NULL) THEN
		signal sqlstate '45000' set message_text = 'p_idCompra null';
	ELSE 
		SET v_idCompra = p_idCompra;
    END IF;


    IF(p_idProveedor IS NULL) THEN
		SET v_idProveedor = (SELECT idEmpleado FROM compras WHERE idCompra = p_idCompra);
    ELSE
		IF( (SELECT idProveedor FROM Proveedores WHERE idProveedor = p_idProveedor ) IS NULL) THEN
			signal sqlstate '45000' set message_text = 'No exitste un proveedor con ese id';
		ELSE 
			SET v_idProveedor = p_idProveedor;
		END IF;
    END IF;


    IF(p_idPedido IS NULL) THEN
		SET v_idPedido = (SELECT idPedido FROM compras WHERE idCompra = p_idCompra);
    ELSE
		IF( (SELECT idPedido FROM Pedidos WHERE idPedido = p_idPedido ) IS NULL) THEN
			signal sqlstate '45000' set message_text = 'No exitste el pedido';
		ELSE 
			SET v_idPedido = p_idPedido;
		END IF;
    END IF;


    IF(p_idEmpleado IS NULL) THEN
		SET v_idEmpleado = (SELECT idEmpleado FROM compras WHERE idCompra = p_idCompra);
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
		SET v_fecha = (SELECT fecha FROM compras WHERE idCompra = p_idCompra);
    END IF;
    
	
    IF(p_total IS NOT NULL) THEN
		
		IF(NOT p_total REGEXP '^[1-9]+$') THEN
			signal sqlstate '45000' set message_text = 'Total ingresado invalido';
		ELSE
			SET v_total = p_total;
		END IF;
    ELSE
		SET v_total = (SELECT total FROM compras WHERE idCompra = p_idCompra);
    END IF;
    
    
	IF(p_observaciones IS NULL) THEN 
		SET v_observaciones = (SELECT observaciones FROM compras WHERE idCompra = p_idCompra);
	ELSE
		SET v_observaciones = p_observaciones; 
	END IF;
    
    
	UPDATE `proyecto`.`compras` 
	SET 
		`idCompra` = v_idCompra,
		`idProveedor` = v_idProveedor,
		`idPedido` = v_idPedido,
		`idEmpleado` = v_idEmpleado,
		`fecha` = v_fecha,
		`total` = v_total,
		`observaciones` = v_observaciones
	WHERE
		`idCompra` = v_idCompra;
    
    SELECT 'Compra modificada con exito' AS 'Exito';
	 
END //

DELIMITER ;
