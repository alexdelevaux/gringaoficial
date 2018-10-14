module.exports = function(app) {
 
    const proveedores = require('../controller/proveedor.controller.js');
 
    // Crea un nuevo proveedor
    app.post('/api/proveedores', proveedores.create);
 
    // Trae todos los proveedores
    app.get('/api/proveedores', proveedores.findAll);
 
    // Trae un proveedor por Id
    app.get('/api/proveedores/:proveedorId', proveedores.findById);
 
    //  Actuliza un proveedor por Id
    app.put('/api/proveedores', proveedores.update);
 
    //  Elimina un proveedor por Id
    app.delete('/api/proveedores/:proveedorId', proveedores.delete);
}