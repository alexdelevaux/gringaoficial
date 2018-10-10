use gringa;
SELECT venta.id as idVenta, empleados.id as idEmpleado, total,
fecha, nombre, apellido, usuario FROM gringa.venta join empleados
on venta.empleadoId = empleados.id;