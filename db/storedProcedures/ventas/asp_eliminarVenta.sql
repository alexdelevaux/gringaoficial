-- =======================
-- ELIMINAR VENTA - SP 
-- =======================

--  09/02/2019
-- Fernanda Valle
-- Alejandro Cisneros Delevaux
-- La Gringa

-- creacion: 09/02/2019
-- stored procedure


USE `proyecto` ;


DROP PROCEDURE IF EXISTS asp_eliminarVenta;

DELIMITER //

CREATE PROCEDURE `asp_eliminarVenta` ( p_idVenta INT )

BEGIN
	
	IF(p_idVenta IS NULL) THEN
		signal sqlstate '45000' set message_text = 'p_idVenta null';
    END IF;

	START TRANSACTION;
    
		DELETE FROM `proyecto`.`lineasVenta`          
		WHERE idVenta = p_idVenta;

    COMMIT;
    
	START TRANSACTION;
    
		DELETE FROM `proyecto`.`ventas`          
		WHERE idVenta = p_idVenta;

    COMMIT;
    
    SELECT 'Venta eliminada con exito' AS 'Exito';
    
END //

DELIMITER ;

-- #####################################################################################


