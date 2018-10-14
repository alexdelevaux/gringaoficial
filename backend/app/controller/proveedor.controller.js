const db = require('../config/db.config.js');
const Proveedor = db.proveedores;

// Post de un Proveedor
exports.create = (req, res) => {	
	// Guarda en MySQL
	let proveedor = req.body;
	Proveedor.create(proveedor).then(result => {		
		// Envia el proveedor creado al cliente
		res.json(result);
	});
};

exports.findAll = (req, res) => {
	Proveedor.findAll().then(proveedores => {
	  // Envia los proveedores al client
	  res.json(proveedores);
	});
};

// Busca un Proveedor por Id
exports.findById = (req, res) => {	
	Proveedor.findById(req.params.proveedorId).then(proveedor => {
		res.json(proveedor);
	})
};
 
// Update de un proveedor
exports.update = (req, res) => {
	let proveedor = req.body;
	let id = req.body.id;
	Proveedor.update(proveedor, 
					 { where: {id: id} }
				   ).then(() => {
						 res.status(200).json({msg:"Update exitoso de proveedor con id = " + id});
				   });	
};
 
// Elimina un Proveedor por Id
exports.delete = (req, res) => {
	const id = req.params.proveedorId;
	Proveedor.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).json({msg:'Eliminacion exitosa de proveedor con id = ' + id});
	});
};