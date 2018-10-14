const db = require('../config/db.config.js');
const Lineas_venta = db.lineas_ventas;

// Post de un Lineas_venta
exports.create = (req, res) => {	
	// Guarda en MySQL
	let lineas_venta = req.body;
	Lineas_venta.create(lineas_venta).then(result => {		
		// Envia el lineas_venta creado al cliente
		res.json(result);
	});
};

exports.findAll = (req, res) => {
	Lineas_venta.findAll().then(lineas_ventas => {
	  // Envia los lineas_ventas al client
	  res.json(lineas_ventas);
	});
};

// Busca un Lineas_venta por Id
exports.findById = (req, res) => {	
	Lineas_venta.findById(req.params.lineas_ventaId).then(lineas_lineas_ventaventa => {
		res.json(lineas_venta);
	})
};
 
// Update de un lineas_venta
exports.update = (req, res) => {
	let lineas_venta = req.body;
	let id = req.body.id;
	Lineas_venta.update(lineas_venta, 
					 { where: {id: id} }
				   ).then(() => {
						 res.status(200).json({msg:"Update exitoso de lineas_venta con id = " + id});
				   });	
};
 
// Elimina un Lineas_venta por Id
exports.delete = (req, res) => {
	const id = req.params.lineas_ventaId;
	Lineas_venta.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).json({msg:'Eliminacion exitosa de lineas_venta con id = ' + id});
	});
};