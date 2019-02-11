-- =============================
-- TOP 10 VENTAS X FECHA - SP 
-- =============================

--  09/02/2019
-- Fernanda Valle
-- Alejandro Cisneros Delevaux
-- La Gringa

-- creacion: 09/02/2019
-- stored procedure

USE `proyecto` ;

DROP PROCEDURE IF EXISTS asp_top_ventas_fechas;

DELIMITER //

CREATE PROCEDURE `asp_top_ventas_fechas`(p_fecha1 TIMESTAMP, p_fecha2 TIMESTAMP)

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
    
    
-- TOP 10 de ventas (de siempre) desde la fecha más cercana
	IF(p_fecha1 IS NULL AND p_fecha2 IS NULL) THEN

		SELECT lineasventa.idProducto AS ID_Producto, producto AS Producto, 
				SUM(lineasventa.cantidad) AS Numero_de_Ventas, DATE(ventas.fecha) as Fecha 
		FROM lineasventa 
		JOIN ventas 
			ON lineasVenta.idVenta = ventas.idVenta
		JOIN productos 
			ON lineasventa.idProducto = productos.idProducto
		GROUP BY 1, 2
		ORDER BY Numero_de_Ventas DESC
		LIMIT 10; 
			
    END IF;


	IF(p_fecha1 IS NOT NULL AND p_fecha2 IS NULL) THEN
    
		SELECT lineasVenta.idProducto AS ID_Producto, producto AS Producto, 
				SUM(lineasventa.cantidad) AS Numero_de_Ventas, DATE(ventas.fecha) AS Fecha 
		FROM lineasventa 
		JOIN ventas
			ON lineasVenta.idVenta = ventas.idVenta
		JOIN productos 
			ON lineasVenta.idProducto = productos.idProducto
		WHERE ventas.fecha between p_fecha1 AND CURRENT_TIMESTAMP()
		GROUP BY 1, 2
		ORDER BY Numero_de_Ventas DESC
		LIMIT 10; 
    
    END IF;
    
    
    IF(p_fecha1 IS NULL AND p_fecha2 IS NOT NULL) THEN
    
		SELECT lineasventa.idProducto AS ID_Producto, producto AS Producto, 
				SUM(lineasventa.cantidad) AS Numero_de_Ventas, DATE(ventas.fecha) AS Fecha 
		FROM lineasventa 
		JOIN ventas
			ON lineasVenta.idVenta = ventas.idVenta
		JOIN productos 
			ON lineasventa.idProducto = productos.idProducto
		WHERE ventas.fecha < p_fecha2
		GROUP BY 1, 2
		ORDER BY Numero_de_Ventas DESC
		LIMIT 10; 
    
    END IF;
    

	IF(p_fecha1 IS NOT NULL AND p_fecha2 IS NOT NULL) THEN
    
		SELECT lineasventa.idProducto AS ID_Producto, producto AS Producto, 
				SUM(lineasventa.cantidad) AS Numero_de_Ventas, DATE(ventas.fecha) AS Fecha 
		FROM lineasventa 
		JOIN ventas 
			ON lineasVenta.idVenta = ventas.idVenta
		JOIN productos 
			ON lineasventa.idProducto = productos.idProducto
		WHERE ventas.fecha between p_fecha1 AND p_fecha2
		GROUP BY 1, 2
		ORDER BY Numero_de_Ventas DESC
		LIMIT 10; 
    
    END IF;
    

END //


DELIMITER ;