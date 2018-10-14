module.exports = function(app) {
 
    const etiquetas = require('../controller/etiqueta.controller.js');
 
    // Create a new etiqueta
    app.post('/api/etiquetas', etiquetas.create);
 
    // Retrieve all etiqueta
    app.get('/api/etiquetas', etiquetas.findAll);
 
    // Retrieve a single etiqueta by Id
    app.get('/api/etiquetas/:etiquetaId', etiquetas.findById);
 
    // Update a etiqueta with Id
    app.put('/api/etiquetas', etiquetas.update);
 
    // Delete a etiqueta with Id
    app.delete('/api/etiquetas/:etiquetaId', etiquetas.delete);
}