-- 07/02/2019
-- Fernanda Valle
-- Alejandro Cisneros Delevaux
-- La Gringa

--  creacion: 07/02/2019
-- stored procedure

USE `proyecto` ;

-- =========	ELIMINAR PRODUCTO - SP	========================================================================


DROP PROCEDURE IF EXISTS asp_eliminarProducto;

DELIMITER //

CREATE PROCEDURE `asp_eliminarProducto` (p_idProducto int)
BEGIN
    
    IF( (SELECT idProducto FROM productos WHERE idProducto = p_idProducto ) IS NULL) THEN
		signal sqlstate '45000' set message_text = 'No existe el producto';
	ELSE
		IF((SELECT idProducto FROM lineasVenta WHERE idProducto = p_idProducto ) IS NOT NULL) then
			signal sqlstate '45000' set message_text = 'Producto tiene ventas asociadas';
		END IF;
		
        IF((SELECT idProducto FROM lineasCompra WHERE idProducto = p_idProducto ) IS NOT NULL) then
			signal sqlstate '45000' set message_text = 'Producto tiene compras asociadas';
		END IF;
            
		IF((SELECT idProducto FROM lineasPedido WHERE idProducto = p_idProducto ) IS NOT NULL) then
			signal sqlstate '45000' set message_text = 'Producto tiene pedidos asociados';
		END IF;
		
        IF((SELECT idProducto FROM etiquetas WHERE idProducto = p_idProducto ) IS NOT NULL) then
			signal sqlstate '45000' set message_text = 'Producto tiene etiquetas asociadas';
		END IF;
	END IF;
		
	DELETE FROM `proyecto`.`productos`          
	WHERE idProducto = p_idProducto;
    
    SELECT 'Producto eliminado con exito' AS 'Exito';

END //

DELIMITER ;

-- #####################################################################################




