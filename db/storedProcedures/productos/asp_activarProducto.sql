-- ===========================
-- ACTIVAR PRODUCTO x ID- SP 
-- ===========================
-- 07/02/2019
-- Fernanda Valle
-- Alejandro Cisneros Delevaux
-- La Gringa

--  creacion: 07/02/2019
-- stored procedure

USE `proyecto` ;

DROP PROCEDURE IF EXISTS asp_activar_producto_xid;

DELIMITER //

CREATE PROCEDURE `asp_activar_producto_xid`(p_idProducto INTEGER)
BEGIN

	IF (p_idProducto IS NULL) THEN
		signal sqlstate '45000' set message_text = 'p_idProducto null';
    ELSE
		IF( (SELECT idProducto FROM productos WHERE idProducto = p_idProducto ) IS NULL) THEN
			signal sqlstate '45000' set message_text = 'No existe el producto';
		END IF;
        
        IF( (SELECT estado FROM productos WHERE idProducto = p_idProducto ) = 'a') THEN
			signal sqlstate '45000' set message_text = 'El producto ya está activado';
		END IF;
	END IF;
    
	
    UPDATE `proyecto`.`productos` 
	SET 
		estado = 'a'
	WHERE idProducto = p_idProducto;


SELECT 'Producto activado con exito' AS 'Exito'; 
    
END //

DELIMITER ;