-- =======================
-- NUEVO PRODUCTO - SP 
-- =======================

-- 07/01/2019
-- Fernanda Valle
-- Alejandro Cisneros Delevaux
-- La Gringa

-- creacion: 09/09/2018
-- stored procedure

USE `proyecto` ;


DROP PROCEDURE IF EXISTS asp_nuevoProducto;

DELIMITER //

CREATE PROCEDURE `asp_nuevoProducto` (p_idRubro int, 
									p_producto varchar(50), 
                                    p_estado char(1),
                                    p_unixBulto int, 
                                    p_umbral_stock INT,
									p_umbral_vencimiento INT,
                                    p_observaciones varchar(100))
BEGIN
DECLARE p_idProducto INT;

SET p_idProducto  = (SELECT MAX(idProducto) FROM productos) + 1;
    
    IF((SELECT idProducto FROM productos WHERE producto = p_producto) IS NOT NULL) THEN
		-- SELECT 'Ya existe el producto' AS 'Producto';
        signal sqlstate '45000' set message_text = 'Ya existe el producto';
	END IF;
    
	IF(p_producto IS NULL) THEN 
        signal sqlstate '45000' set message_text = 'Nombre de producto null';
    END IF;
    
    IF(NOT p_producto REGEXP '^[a-zA-Z0-9]+$') THEN
		signal sqlstate '45000' set message_text = 'Nombre del producto invalido';
    END IF;
-- Control de rubro.
-- Si no manda rubro se le asigna automaticamente 'varios'=1
-- si no, se hace control de si existe el rubro

	IF(p_idRubro IS NULL) THEN 
		SET p_idRubro = 1;
 	END IF;
    
    IF(NOT p_idRubro REGEXP '^[0-9]+$' OR p_idRubro < 0) THEN 
        signal sqlstate '45000' set message_text = 'Rubro invalido';
    END IF;
    
    IF((SELECT idRubro FROM rubros WHERE idRubro = p_idRubro) IS NULL) THEN
        signal sqlstate '45000' set message_text = 'Rubro inexistente';
	END IF;
    
-- setea estado a valor por defecto si no manda
	IF(p_estado IS NULL) THEN 
		SET p_estado = 'a';
 	END IF;
    
-- Controla que el estado enviado sea valido
    IF(NOT STRCMP(LOWER(p_estado),'a') = 0 OR STRCMP(LOWER(p_estado),'i') = 0 ) THEN 
        signal sqlstate '45000' set message_text = 'Estado inexistente';
    END IF;
        
-- setea el umbral de stock al valor por defecto
	IF(p_umbral_stock IS NULL) THEN 
		SET p_umbral_stock = 10;
 	END IF;
	
	IF(NOT p_umbral_stock REGEXP '^[1-9]+$' OR p_umbral_stock < 0) THEN 
		signal sqlstate '45000' set message_text = 'Umbral de stock invalido';
    END IF;
    
    -- setea el umbral de vencimiento al valor por defecto
	IF(p_umbral_vencimiento IS NULL) THEN 
		SET p_umbral_vencimiento =  15;
 	END IF;
    
    -- corregir regExp
	IF(NOT p_umbral_vencimiento REGEXP '^[1-9]+$' OR p_umbral_vencimiento < 0) THEN 
         signal sqlstate '45000' set message_text = 'Umbral de vencimiento invalido';
    END IF;
 	    
    IF(NOT p_unixBulto REGEXP '^[1-9]+$') THEN
        signal sqlstate '45000' set message_text = 'Unidades por bulto invalidas';
	ELSE
		IF(p_unixBulto IS NULL) THEN 
			SET p_unixBulto = 1;
		END IF;
    END IF;
    
	IF(p_observaciones IS NULL) THEN 
 		SET p_observaciones = '-';
	END IF;


INSERT INTO `proyecto`.`productos` (`idProducto`, `idRubro`, `producto`, `estado`,
									`unixBulto`, `umbral_stock`,`umbral_vencimiento`,
                                    `observaciones`)
	VALUES (p_idProducto, p_idRubro, p_producto, p_estado,
            p_unixBulto, p_umbral_stock, p_umbral_vencimiento, p_observaciones);

SELECT 'Producto creado con exito' AS 'Exito';

END //

DELIMITER ;

-- #####################################################################################




