const db = require('../config/db.config.js');
const Venta = db.ventas;

// Post un Venta
exports.create = (req, res) => {	
	// Save to MySQL database
	let venta = req.body;
	Venta.create(venta).then(result => {		
		// Send created customer to client
		res.json(result);
	});
};
 

exports.findAll = (req, res) => {
	Venta.findAll().then(ventas => {
	  // Send all ventas to Client
	  res.json(ventas);
	});
};

// Find a Venta by Id
exports.findById = (req, res) => {	
	Venta.findById(req.params.ventaId).then(venta => {
		res.json(venta);
	})
};
 
// Update a Customer
exports.update = (req, res) => {
	let venta = req.body;
	let id = req.body.id;
	Venta.update(venta, 
					 { where: {id: id} }
				   ).then(() => {
						 res.status(200).json({msg:"update exitoso de venta con id = " + id});
				   });	
};
 
// Delete a Venta by Id
exports.delete = (req, res) => {
	const id = req.params.ventaId;
	Venta.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).json({msg:'Delete exitoso de venta con id = ' + id});
	});
};