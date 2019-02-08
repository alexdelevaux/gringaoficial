-- =======================
-- ALTA PRODUCTO - SP 
-- =======================

-- 07/01/2019
-- Fernanda Valle
-- Alejandro Cisneros Delevaux
-- La Gringa

--  creacion: 09/09/2018
-- stored procedure

USE `proyecto` ;

-- =========	ALTA PRODUCTO - SP	========================================================================


DROP PROCEDURE IF EXISTS asp_altaProducto;

DELIMITER //

CREATE PROCEDURE `asp_altaProducto` (p_idRubro int, 
									p_producto varchar(50), 
                                    p_estado char(1),
                                    p_unixBulto int, 
                                    p_umbral_stock INT,
									p_umbral_vencimiento INT,
                                    p_observaciones varchar(100))

SALIR : BEGIN
DECLARE p_id INT;

SET p_id  = (SELECT MAX(idProducto) FROM productos) + 1;
    
    IF((SELECT idProducto FROM productos WHERE producto = p_producto) IS NOT NULL) THEN
		-- SELECT 'Ya existe el producto' AS 'Producto';
        signal sqlstate '45000' set message_text = 'Ya existe el producto';
	END IF;
    
	IF(p_producto IS NULL) THEN 
		-- SELECT 'Nombre de producto null' AS 'Producto';
        signal sqlstate '45000' set message_text = 'Nombre de producto null';
		LEAVE SALIR;
    END IF;
    
    IF(NOT p_producto REGEXP '^[a-zA-Z0-9]+$') THEN
		-- SELECT 'Nombre de producto invalido' AS 'Producto';
		signal sqlstate '45000' set message_text = 'Nombre del producto invalido';
        LEAVE SALIR;
    END IF;
-- Control de rubro.
-- Si no manda rubro se le asigna automaticamente 'varios'=1
-- si no, se hace control de si existe el rubro

	IF(p_idRubro IS NULL) THEN 
		SET p_idRubro = 1;
 	END IF;
    
    IF(NOT p_idRubro REGEXP '^[0-9]+$' OR p_idRubro < 0) THEN 
		-- SELECT 'Rubro invalido' AS 'Rubro';
        signal sqlstate '45000' set message_text = 'Rubro invalido';
		LEAVE SALIR;
    END IF;
    
    IF((SELECT idRubro FROM rubros WHERE idRubro = p_idRubro) IS NULL) THEN
		-- SELECT 'Rubro inexistente' AS 'Rubro';
        signal sqlstate '45000' set message_text = 'Rubro inexistente';
        LEAVE SALIR;
	END IF;
    
-- setea estado a valor por defecto si no manda
	IF(p_estado IS NULL) THEN 
		SET p_estado = 'a';
 	END IF;
    
-- Controla que el estado enviado sea valido
    IF(NOT STRCMP(LOWER(p_estado),'a') = 0 OR STRCMP(LOWER(p_estado),'i') = 0 ) THEN 
        LEAVE SALIR;
    END IF;
        
-- setea el umbral de stock al valor por defecto
	IF(p_umbral_stock IS NULL) THEN 
		SET p_umbral_stock = 10;
 	END IF;
	
	IF(NOT p_umbral_stock REGEXP '^[1-9]+$' OR p_umbral_stock < 0) THEN 
		-- SELECT 'Umbral de stock invalido' AS 'umbral_stock';
        signal sqlstate '45000' set message_text = 'Umbral de stock invalido';
        LEAVE SALIR;
    END IF;
    
    -- setea el umbral de vencimiento al valor por defecto
	IF(p_umbral_vencimiento IS NULL) THEN 
		SET p_umbral_vencimiento =  15;
 	END IF;
    
    -- corregir regExp
	IF(NOT p_umbral_vencimiento REGEXP '^[1-9]+$' OR p_umbral_vencimiento < 0) THEN 
		-- SELECT 'Umbral de vencimiento invalido' AS 'umbral_vencimiento';
         signal sqlstate '45000' set message_text = 'Umbral de vencimiento invalido';
        LEAVE SALIR;
    END IF;
 	    
    IF(NOT p_unixBulto REGEXP '^[1-9]+$') THEN
        -- SELECT 'Unidades por bulto invalidas';
        signal sqlstate '45000' set message_text = 'Unidades por bulto invalidas';
        LEAVE SALIR;
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
	VALUES (p_id, p_idRubro, p_producto, p_estado,
            p_unixBulto, p_umbral_stock, p_umbral_vencimiento, p_observaciones);

SELECT 'Producto creado con exito' AS 'Exito';

END //

DELIMITER ;

-- #####################################################################################




