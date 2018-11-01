# gringaoficial
Repositorio oficial de La gringa

## 31/10/18
- [F] Funciona la llamada al SP. Ojo: Queda pendiente por ver las dos versiones de devolucion de datos.
- creacion de funcion para probar queries. Hasta el momento -> Vacia.


## 29/10/18
- [A] Actualizaciones varias menores:
- El componente empleados está totalmente comentado para mejorar su entendimiento
- Se han mudado casi todos los componente a Sass (archivo .scss)
- Se ha creado el componente HomeComponent, que sera el Home. Las rutas a este componente tambien estan creadas.
- Actualizada la barra de navegaciones, para incluir ruta al home, y mejoras en los colores (mudados a Sass, efectos de hover).

## 15/10/18
- [A] Ya funciona el componente Empleados casi en su totalidad:
  * Todos los filtros funcionando correctamente (incluyendo el filtro global)
  * Cuando creamos un nuevo Empleado, ya no hay un "input" para Rol y Estado, sino un dropdown para elegir los valores (igual en los filtros)
  * Colores para todo el componente ya correctos
  * **PENDIENTE**: Que los cambios impacten en el acto

## 14/10/18
- [F] Se completo en server el require para que se creen todas las tablas
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
