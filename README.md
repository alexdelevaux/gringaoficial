# gringaoficial
Repositorio oficial de La gringa

## 14/10/18
- [F] Se creo la carpeta docs/errors en backend para poner sobre errores tipicos y como solucionarlos.
- [F] Se modificaron los archivos para hacer que funcione todo. 
- [F] **IMPORTANTE** Se utilizo un paquete de npm sequelizer para pasar automaticamente las tablas a modelos. Por lo que los modelos ahora se corresponden 100% con los de la db porque están creados a partir de las tablas. (Ej: Ahora el id es idEmpleado /idVenta y las tablas estan en plural)
- [F] Se guardaron los modelos viejos (por las dudas) en la carpeta /models/old

## 10/10/18
- [F] Se creó la parte de ventas
- [F] Se creó la parte de productos
- [F] Se creo la relacion entre empleados y ventas
- [F] Se insertaron datos desde server.js a Ventas y Productos
- [A] Ya se pueden guardar empleados, y se dispara un toast al hacerlo

## 09/10/18
- [F] .gitignore para db.config.js
- [A] Corregidos los errores de seguridad de paquetes de Node. Principalmente el de "parsejson", una vulnerabilidad grave. 
