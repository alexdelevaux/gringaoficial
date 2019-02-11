-- ==================
-- NUEVA COMPRA - SP 
-- ==================

-- 11/02/2019
-- Fernanda Valle
-- Alejandro Cisneros Delevaux
-- La Gringa

-- creacion: 11/02/2019
-- stored procedure

USE `proyecto` ;


DROP PROCEDURE IF EXISTS asp_nuevaCompra;

DELIMITER //

CREATE PROCEDURE `asp_nuevaCompra` (
                                p_idProveedor INT,
                                p_idPedido INT,
								p_idEmpleado INT,
								p_fecha  TIMESTAMP,
								p_total DECIMAL(8,2),
								p_observaciones VARCHAR(50)
								)

BEGIN

DECLARE p_idCompra INT;

SET p_idCompra  = (SELECT MAX(idCompra) FROM compras) + 1;
    
	IF(p_idProveedor IS NULL) THEN 
        signal sqlstate '45000' set message_text = 'p_idProveedor null';
        -- SET p_idProveedor = 1;
    ELSE
        IF((SELECT idProveedor FROM Proveedres WHERE idProveedor = p_idProveedor) IS NULL) THEN
        signal sqlstate '45000' set message_text = 'Peoveedor inexistente';
	END IF;


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


    -- Si no hay un pedido, se crea un pedido automticamente con 
    -- con la fecha de la compra y proveedor X (idProveedor = 1)
    IF(p_idPedido IS NULL) THEN 
        
        START TRANSACTION;
            SET p_idPedido = (SELECT MAX(idPedido) FROM Pedidos) + 1;
            
            INSERT INTO Pedidos (
                idPedido, idProveedor, idEmpleado, fecha, total, estado, observaciones
            )
            VALUES (p_idPedido, p_idProveedor, p_idEmpleado, p_fecha, p_total, 'c' , p_observaciones);
        
        COMMIT;
    ELSE
    -- Tengo que poner idProveedor? Clave compuesta. En base a qué se cambian los índices.
        IF((SELECT idPedido FROM Pedidos WHERE idPedido = p_idPedido AND idProveedor = p_idProveedor) IS NULL) THEN
            signal sqlstate '45000' set message_text = 'Pedido inexistente';
	END IF;



	INSERT INTO `proyecto`.`compras`
		(`idCompra`, `idProveedor`,`idPedido`,`idEmpleado`, `fecha`, `total`, `observaciones`)
	VALUES (p_idCompra, p_idProveedor, p_idPedido, p_idEmpleado, p_fecha, p_total, p_observaciones);


SELECT 'Compra creada con exito' AS 'Exito';

END //

DELIMITER ;
