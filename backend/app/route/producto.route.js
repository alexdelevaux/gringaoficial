module.exports = function(app) {
 
    const productos = require('../controller/producto.controller.js');
 
    // Create a new Venta
    app.post('/api/productos', productos.create);
 
    // Retrieve all Venta
    app.get('/api/productos', productos.findAll);
 
    // Retrieve a single Venta by Id
    app.get('/api/productos/:productoId', productos.findById);
 
    // Update a Venta with Id
    app.put('/api/productos', productos.update);
 
    // Delete a Venta with Id
    app.delete('/api/productos/:productoId', productos.delete);
}