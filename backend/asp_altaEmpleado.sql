--  04/09/2018
-- Fernanda Valle
-- Alejandro Cisneros Delevaux
-- La Gringa

-- stored procedure

USE `proyecto` ;


-- =========	ALTA EMPLEADO - SP	========================================================================


DROP PROCEDURE IF EXISTS asp_altaEmpleado;

DELIMITER //

CREATE PROCEDURE `asp_altaEmpleado` (pus varchar(45), pcontra varchar(45), pnomb varchar(45),
			pap varchar(45), pest char(1), pobs varchar(100), 
            prol char(1), OUT resultado varchar(100))


SALIR : BEGIN
DECLARE pid INT;
SET resultado = 'Empleado creado con exito';

SET pid  = (SELECT MAX(idEmpleado) FROM empleados) + 1;
    
    IF((SELECT idEmpleado FROM empleados WHERE usuario = pus) IS NOT NULL) THEN
		SET resultado = 'El nombre de usuario debe ser unico.';
        SELECT resultado;
        LEAVE SALIR;
	END IF;
    
    
    IF(pnomb IS NULL OR NOT pnomb REGEXP '^[a-z]+$') THEN 
		
        SET resultado = 'Solo debe contener caracteres alfabeticos';
        SELECT resultado;
        LEAVE SALIR;
    END IF;
    
	IF(pap IS NULL OR NOT pap REGEXP '^[a-z]+$') THEN 
         SET resultado = 'No puede existir un apellido vacio y solo debe contener caracteres alfabeticos';
         SELECT resultado;
        LEAVE SALIR;
    END IF;
    
    IF(pus IS NULL OR NOT pus REGEXP '^[a-zA-Z0-9]+$') THEN 
		SET resultado = 'No puede existir un usuario vacio';
        SELECT resultado;
        LEAVE SALIR;
    END IF;
    
    IF(pcontra IS NULL OR NOT pcontra REGEXP '^[a-zA-Z0-9]+$') THEN 
		SET resultado = 'La contrasena no es valida';
		SELECT resultado;
        LEAVE SALIR;
    END IF;
    

 	IF(pobs IS NULL) THEN 
 		SET pobs = '-';
     END IF;

-- Si le envia null lo pone en Activo
     IF(pest IS NULL) THEN 
 		SET pest = 'a';
 	END IF;
    
-- Controla que el estado enviado sea valido
    IF(NOT STRCMP(LOWER(pest),'a') = 0 OR STRCMP(LOWER(pest),'i') = 0 ) THEN 
        SET resultado = 'Estado ingresado invalido';
        SELECT resultado;
        LEAVE SALIR;
    END IF;
    
-- pone rol Vendedor por defecto	
     IF(prol IS NULL) THEN 
 		SET prol = 'v';
 	END IF;
    
-- controla que el rol sea valido
    IF(NOT STRCMP(LOWER(prol),'v') = 0 OR STRCMP(LOWER(prol),'a') = 0 ) THEN 
		SET resultado = 'Rol ingresado invalido';
		SELECT resultado;
        LEAVE SALIR;
    END IF;
	

INSERT INTO `proyecto`.`empleados` (`idEmpleado`, `usuario`, `contrasena`, 
			`nombre`, `apellido`, `estado`, 
            `observaciones`, `rol`) 
			VALUES (pid, pus, pcontra, pnomb, pap, pest, pobs, prol);

SELECT resultado;

END //

DELIMITER ;

set @resultado = '';

--  `asp_altaEmpleado` (pus varchar(45), pcontra varchar(45), pnomb varchar(45),
-- 			pap varchar(45), pest char(1), pobs varchar(100), 
--          prol char(1), OUT resultado varchar(100))

call asp_altaEmpleado('juaita', 'pswjuana','juana', 'cruz', null, null, null, @resultado);
call asp_altaEmpleado('marianita', 'pswmarianita','mariana', 'lopez', 'a', null, 'v', @resultado);
-- #####################################################################################




