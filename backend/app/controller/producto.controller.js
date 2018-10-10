const db = require('../config/db.config.js');
const Producto = db.productos;

// Post un Producto
exports.create = (req, res) => {	
	// Save to MySQL database
	let producto = req.body;
	Producto.create(producto).then(result => {		
		// Send created customer to client
		res.json(result);
	});
};
 

exports.findAll = (req, res) => {
	Producto.findAll().then(productos => {
	  // Send all productos to Client
	  res.json(productos);
	});
};

// Find a Producto by Id
exports.findById = (req, res) => {	
	Producto.findById(req.params.productoId).then(producto => {
		res.json(producto);
	})
};
 
// Update a Customer
exports.update = (req, res) => {
	let producto = req.body;
	let id = req.body.id;
	Producto.update(producto, 
					 { where: {id: id} }
				   ).then(() => {
						 res.status(200).json({msg:"update exitoso de producto con id = " + id});
				   });	
};
 
// Delete a Producto by Id
exports.delete = (req, res) => {
	const id = req.params.productoId;
	Producto.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).json({msg:'Delete exitoso de producto con id = ' + id});
	});
};