module.exports = function(app) {
 
    const rubros = require('../controller/rubro.controller.js');
 
    // Crea un nuevo rubro
    app.post('/api/rubros', rubros.create);
 
    // Trae todos los rubros
    app.get('/api/rubros', rubros.findAll);
 
    // Trae un rubro por Id
    app.get('/api/rubros/:rubroId', rubros.findById);
 
    //  Actuliza un rubro por Id
    app.put('/api/rubros', rubros.update);
 
    //  Elimina un rubro por Id
    app.delete('/api/rubros/:rubroId', rubros.delete);
}