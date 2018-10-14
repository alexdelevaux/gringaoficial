module.exports = function(app) {
 
    const rubros = require('../controller/rubro.controller.js');
 
    // Create a new rubro
    app.post('/api/rubros', rubros.create);
 
    // Retrieve all rubro
    app.get('/api/rubros', rubros.findAll);
 
    // Retrieve a single rubro by Id
    app.get('/api/rubros/:rubroId', rubros.findById);
 
    // Update a rubro with Id
    app.put('/api/rubros', rubros.update);
 
    // Delete a rubro with Id
    app.delete('/api/rubros/:rubroId', rubros.delete);
}