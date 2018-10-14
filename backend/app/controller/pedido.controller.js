const db = require('../config/db.config.js');
const Pedido = db.pedidos;

// Post de un Pedido
exports.create = (req, res) => {	
	// Guarda en MySQL
	let pedido = req.body;
	Pedido.create(pedido).then(result => {		
		// Envia el pedido creado al cliente
		res.json(result);
	});
};

exports.findAll = (req, res) => {
	Pedido.findAll().then(pedidos => {
	  // Envia los pedidos al client
	  res.json(pedidos);
	});
};

// Busca un Pedido por Id
exports.findById = (req, res) => {	
	Pedido.findById(req.params.pedidoId).then(pedido => {
		res.json(pedido);
	})
};
 
// Update de un pedido
exports.update = (req, res) => {
	let pedido = req.body;
	let id = req.body.id;
	Pedido.update(pedido, 
					 { where: {id: id} }
				   ).then(() => {
						 res.status(200).json({msg:"Update exitoso de pedido con id = " + id});
				   });	
};
 
// Elimina un Pedido por Id
exports.delete = (req, res) => {
	const id = req.params.pedidoId;
	Pedido.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).json({msg:'Eliminacion exitosa de pedido con id = ' + id});
	});
};