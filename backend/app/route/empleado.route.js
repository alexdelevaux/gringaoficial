module.exports = function(app) {
 
    const empleados = require('../controller/empleado.controller.js');
 
    // Create a new Empleado
    app.post('/api/empleados', empleados.create);
 
    // Retrieve all Empleado
    app.get('/api/empleados', empleados.findAll);
 
    // Retrieve a single Empleado by Id
    app.get('/api/empleados/:empleadosId', empleados.findById);
 
    // Update a Empleado with Id
    app.put('/api/empleados', empleados.update);
 
    // Delete a Empleado with Id
    app.delete('/api/empleados/:empleadoId', empleados.delete);
}