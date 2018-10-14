module.exports = function(app) {
 
    const pedidos = require('../controller/pedido.controller.js');
 
    // Crea un nuevo pedido
    app.post('/api/pedidos', pedidos.create);
 
    // Trae todos los pedidos
    app.get('/api/pedidos', pedidos.findAll);
 
    // Trae un pedido por Id
    app.get('/api/pedidos/:pedidoId', pedidos.findById);
 
    //  Actuliza un pedido por Id
    app.put('/api/pedidos', pedidos.update);
 
    //  Elimina un pedido por Id
    app.delete('/api/pedidos/:pedidoId', pedidos.delete);
}