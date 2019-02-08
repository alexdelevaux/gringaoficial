-- 07/01/2019
-- Fernanda Valle
-- Alejandro Cisneros Delevaux
-- La Gringa

--  creacion: 09/09/2018
-- stored procedure

USE `proyecto` ;

-- =========	ALTA PRODUCTO - SP	========================================================================


DROP PROCEDURE IF EXISTS asp_modificarProducto;

DELIMITER //

CREATE PROCEDURE `asp_modificarProducto` (p_idProducto int, 
											p_idRubro int, 
											p_producto varchar(50), 
											p_estado char(1),
											p_unixBulto int, 
											p_umbral_stock INT,
											p_umbral_vencimiento INT,
											p_observaciones varchar(100))

SALIR : BEGIN
DECLARE v_idProducto INT;
DECLARE v_idRubro int;
DECLARE v_producto varchar(50);
DECLARE v_estado char(1);
DECLARE v_unixBulto int;
DECLARE v_umbral_stock INT;
DECLARE v_umbral_vencimiento INT;
DECLARE v_observaciones varchar(100);

    set v_idProducto = p_idProducto;
    
    IF( (SELECT idProducto FROM productos WHERE idProducto = p_idProducto ) IS NULL) THEN
		signal sqlstate '45000' set message_text = 'No existe el producto';
    END IF;
    
    
    IF(p_producto IS NOT NULL) THEN
		
		IF(NOT p_producto REGEXP '^[a-zA-Z0-9]+$') THEN
			-- SELECT 'Nombre de producto invalido' AS 'Producto';
			signal sqlstate '45000' set message_text = 'Nombre del producto invalido';		
		ELSE
			IF((SELECT idProducto FROM productos WHERE producto = p_producto) <> p_idProducto) THEN
					
				signal sqlstate '45000' set message_text = 'Ya existe un producto con ese nombre';
			ELSE
				SET v_producto = p_producto;
			END IF;
		END IF;
     ELSE
 		SET v_producto = (SELECT producto FROM productos WHERE idProducto = p_idProducto);
    END IF;
    

	IF(p_idRubro IS NOT NULL) THEN
        IF((SELECT idRubro FROM rubros WHERE idRubro = p_idRubro) IS NULL) THEN
            signal sqlstate '45000' set message_text = 'Rubro inexistente';
		ELSE
			SET v_idRubro = p_idRubro;
		END IF;
	ELSE    
		SET v_idRubro = (SELECT idRubro FROM productos WHERE idProducto = p_idProducto);
	END IF;
    
    
    IF(p_estado IS NOT NULL) THEN
		
        IF(NOT (STRCMP(LOWER(p_estado),'a') = 0 OR STRCMP(LOWER(p_estado),'i') = 0 )) THEN 
			signal sqlstate '45000' set message_text = 'Estado ingresado invalido';
		ELSE
			SET v_estado = p_estado; 
		END IF;
	ELSE    
		SET v_estado = (SELECT estado FROM productos WHERE idProducto = p_idProducto);
	END IF;
    
	
    IF(p_umbral_stock IS NOT NULL) THEN
		
        IF(NOT p_umbral_stock REGEXP '^[1-9]+$' OR p_umbral_stock < 0) THEN 
			-- SELECT 'Umbral de stock invalido' AS 'umbral_stock';
			signal sqlstate '45000' set message_text = 'Umbral de stock invalido';
        ELSE
			SET v_umbral_stock = p_umbral_stock; 
		END IF;
	ELSE    
		SET v_umbral_stock = (SELECT umbral_stock FROM productos WHERE idProducto = p_idProducto);
	END IF;

	
    IF(p_umbral_vencimiento IS NOT NULL) THEN
		
        IF(NOT p_umbral_vencimiento REGEXP '^[1-9]+$' OR p_umbral_vencimiento < 0) THEN 
		-- SELECT 'Umbral de vencimiento invalido' AS 'umbral_vencimiento';
			signal sqlstate '45000' set message_text = 'Umbral de vencimiento invalido';
		ELSE
			SET v_umbral_vencimiento = p_umbral_vencimiento; 
		END IF;
	ELSE    
		SET v_umbral_vencimiento = (SELECT umbral_vencimiento FROM productos WHERE idProducto = p_idProducto);
	END IF;
	
	
    IF(p_unixBulto IS NOT NULL) THEN
    
		IF(NOT p_unixBulto REGEXP '^[1-9]+$') THEN
        -- SELECT 'Unidades por bulto invalidas';
			signal sqlstate '45000' set message_text = 'Unidades por bulto invalidas';
		ELSE
			SET v_unixBulto = p_unixBulto; 
		END IF;
	ELSE    
		SET v_unixBulto = (SELECT unixBulto FROM productos WHERE idProducto = p_idProducto);
	END IF;
		
        
	IF(p_observaciones IS NULL) THEN 
		SET v_observaciones = (SELECT observaciones FROM productos WHERE idProducto = p_idProducto);
	ELSE
		SET v_observaciones = p_observaciones; 
	END IF;
    

	UPDATE `proyecto`.`productos` 
	SET 
		idProducto = v_idProducto,
		idRubro = v_idRubro,
		producto = v_producto,
		estado = v_estado,
        unixBulto = v_unixBulto,
		umbral_stock = v_umbral_stock,
		umbral_vencimiento = v_umbral_vencimiento,
		observaciones = v_observaciones
            
	WHERE idProducto = v_idProducto;


SELECT 'Producto modificado con exito' AS 'Exito';

END //

DELIMITER ;

-- #####################################################################################




