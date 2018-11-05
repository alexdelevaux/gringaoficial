module.exports = function(app) {

    const empleados = require('../controller/empleado.controller.js');

    // Create a new Empleado
    app.post('/api/empleados', empleados.create);

    // Retrieve all Empleado
    app.get('/api/empleados', empleados.findAll);

    // Devuelve un solo empleado con el Id enviado
    app.get('/api/empleados/:empleadosId', empleados.findById);

    // Update del Empleado con el Id enviado
    app.put('/api/empleados', empleados.update);

    // Delete a Empleado with Id
    app.delete('/api/empleados/:empleadoId', empleados.delete);


    // Nuevos!
    // Busca todos los empleados por el apellido enviado
    app.get('/api/empleados/:apellido', empleados.findByApellido);

}