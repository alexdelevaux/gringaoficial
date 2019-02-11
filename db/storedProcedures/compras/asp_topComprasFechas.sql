-- =============================
-- TOP 10 COMPRAS X FECHA - SP 
-- =============================

--  11/02/2019
-- Fernanda Valle
-- Alejandro Cisneros Delevaux
-- La Gringa

-- creacion: 11/02/2019
-- stored procedure

USE `proyecto` ;

DROP PROCEDURE IF EXISTS asp_top_compras_fechas;

DELIMITER //

CREATE PROCEDURE `asp_top_compras_fechas`(p_fecha1 TIMESTAMP, p_fecha2 TIMESTAMP)

BEGIN

	IF(p_fecha1 > CURRENT_TIMESTAMP()) THEN
		signal sqlstate '45000' set message_text = 'Fecha1 ingresada futura';
	END IF;
	
    
	IF(p_fecha2 > CURRENT_TIMESTAMP()) THEN
		signal sqlstate '45000' set message_text = 'Fecha2 ingresada futura';
	END IF;
    
	IF(p_fecha1 > p_fecha2) THEN
		signal sqlstate '45000' set message_text = 'Fechas en orden incorrecto';
	END IF;
    
    
-- TOP 10 de compras (de siempre) desde la fecha más cercana
	IF(p_fecha1 IS NULL AND p_fecha2 IS NULL) THEN

		SELECT lineasCompra.idProducto AS ID_Producto, producto AS Producto, 
				SUM(lineasCompra.cantidad) AS Numero_de_compras, DATE(compras.fecha) as Fecha 
		FROM lineasCompra 
		JOIN compras 
			ON lineasCompra.idCompra = compras.idCompra
		JOIN productos 
			ON lineasCompra.idProducto = productos.idProducto
		GROUP BY 1, 2
		ORDER BY Numero_de_compras DESC
		LIMIT 10; 
			
    END IF;


	IF(p_fecha1 IS NOT NULL AND p_fecha2 IS NULL) THEN
    
		SELECT lineasCompra.idProducto AS ID_Producto, producto AS Producto, 
				SUM(lineasCompra.cantidad) AS Numero_de_compras, DATE(compras.fecha) AS Fecha 
		FROM lineasCompra 
		JOIN compras
			ON lineasCompra.idCompra = compras.idCompra
		JOIN productos 
			ON lineasCompra.idProducto = productos.idProducto
		WHERE compras.fecha between p_fecha1 AND CURRENT_TIMESTAMP()
		GROUP BY 1, 2
		ORDER BY Numero_de_Compras DESC
		LIMIT 10; 
    
    END IF;
    
    
    IF(p_fecha1 IS NULL AND p_fecha2 IS NOT NULL) THEN
    
		SELECT lineasCompra.idProducto AS ID_Producto, producto AS Producto, 
				SUM(lineasCompra.cantidad) AS Numero_de_Compras, DATE(compras.fecha) AS Fecha 
		FROM lineasCompra 
		JOIN compras
			ON lineasCompra.idCompra = compras.idCompra
		JOIN productos 
			ON lineasCompra.idProducto = productos.idProducto
		WHERE compras.fecha < p_fecha2
		GROUP BY 1, 2
		ORDER BY Numero_de_Compras DESC
		LIMIT 10; 
    
    END IF;
    

	IF(p_fecha1 IS NOT NULL AND p_fecha2 IS NOT NULL) THEN
    
		SELECT lineasCompra.idProducto AS ID_Producto, producto AS Producto, 
				SUM(lineasCompra.cantidad) AS Numero_de_Compras, DATE(compras.fecha) AS Fecha 
		FROM lineasCompra 
		JOIN compras 
			ON lineasCompra.idCompra = compras.idCompra
		JOIN productos 
			ON lineasCompra.idProducto = productos.idProducto
		WHERE compras.fecha between p_fecha1 AND p_fecha2
		GROUP BY 1, 2
		ORDER BY Numero_de_Compras DESC
		LIMIT 10; 
    
    END IF;
    

END //


DELIMITER ;