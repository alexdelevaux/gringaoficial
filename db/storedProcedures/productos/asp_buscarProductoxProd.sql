-- =================================
-- BUSCAR PRODUCTO x PRODUCTO - SP 
-- =================================
-- 07/02/2019
-- Fernanda Valle
-- Alejandro Cisneros Delevaux
-- La Gringa

--  creacion: 07/02/2019
-- stored procedure

USE `proyecto` ;


DROP PROCEDURE IF EXISTS asp_buscar_producto_xprod;

DELIMITER //

CREATE PROCEDURE `asp_buscar_producto_xprod`(p_producto varchar(50))
BEGIN
	IF (p_producto IS NULL) THEN
		signal sqlstate '45000' set message_text = 'p_producto null';
    ELSE
		IF( (SELECT idProducto FROM productos WHERE producto = p_producto ) IS NULL) THEN
			signal sqlstate '45000' set message_text = 'No existe un producto con ese nombre';
		END IF;
	END IF;
    
    SELECT * FROM productos WHERE producto = p_producto;   
    
END //

DELIMITER ;