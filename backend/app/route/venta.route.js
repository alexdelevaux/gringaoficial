module.exports = function(app) {
 
    const ventas = require('../controller/venta.controller.js');
 
    // Create a new Venta
    app.post('/api/ventas', ventas.create);
 
    // Retrieve all Venta
    app.get('/api/ventas', ventas.findAll);
 
    // Retrieve a single Venta by Id
    app.get('/api/ventas/:ventaId', ventas.findById);
 
    // Update a Venta with Id
    app.put('/api/ventas', ventas.update);
 
    // Delete a Venta with Id
    app.delete('/api/ventas/:ventaId', ventas.delete);
}