module.exports = function(app) {
 
    const lineas_ventas = require('../controller/lineas_venta.controller.js');
 
    // Crea un nuevo lineas_venta
    app.post('/api/lineas_ventas', lineas_ventas.create);
 
    // Trae todos los lineas_ventas
    app.get('/api/lineas_ventas', lineas_ventas.findAll);
 
    // Trae un lineas_venta por Id
    app.get('/api/lineas_ventas/:lineas_ventaId', lineas_ventas.findById);
 
    //  Actuliza un lineas_venta por Id
    app.put('/api/lineas_ventas', lineas_ventas.update);
 
    //  Elimina un lineas_venta por Id
    app.delete('/api/lineas_ventas/:lineas_ventaId', lineas_ventas.delete);
}