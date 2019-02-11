-- =======================
-- ELIMINAR COMPRA - SP 
-- =======================

--  09/02/2019
-- Fernanda Valle
-- Alejandro Cisneros Delevaux
-- La Gringa

-- creacion: 09/02/2019
-- stored procedure


USE `proyecto` ;


DROP PROCEDURE IF EXISTS asp_eliminarCompra;

DELIMITER //

CREATE PROCEDURE `asp_eliminarCompra` ( p_compra INT )

BEGIN
	
	IF(p_compra IS NULL) THEN
		signal sqlstate '45000' set message_text = 'p_compra null';
    END IF;

	START TRANSACTION;
    
		DELETE FROM `proyecto`.`lineasCompra`          
		WHERE idCompra = p_compra;

    COMMIT;
    
	START TRANSACTION;
    
		DELETE FROM `proyecto`.`compras`          
		WHERE idCompra = p_compra;

    COMMIT;
    
    SELECT 'Compra eliminada con exito' AS 'Exito';
    
END //

DELIMITER ;

