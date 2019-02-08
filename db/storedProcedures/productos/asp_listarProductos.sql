-- =======================
-- LISTAR PRODUCTOS - SP 
-- =======================

-- 07/02/2019
-- Fernanda Valle
-- Alejandro Cisneros Delevaux
-- La Gringa

--  creacion: 07/02/2019
-- stored procedure

USE `proyecto` ;

DROP PROCEDURE IF EXISTS asp_listar_productos;


DELIMITER //

CREATE PROCEDURE asp_listar_productos ()

BEGIN

	SELECT 
		idProducto, 
        producto, 
        productos.idRubro, 
        rubros.rubro as Rubro, 
        productos.estado, 
        unixBulto,
        umbral_stock,
        umbral_vencimiento,
        productos.observaciones
        
	FROM productos
    JOIN proyecto.rubros
    ON productos.idRubro = rubros.idRubro
    
    ORDER BY estado, producto, rubro ASC;

END //

DELIMITER ;