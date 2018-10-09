const db = require('../config/db.config.js');
const Empleado = db.empleados;

// Post un Empleado
exports.create = (req, res) => {	
	// Save to MySQL database
	let empleado = req.body;
	Empleado.create(empleado).then(result => {		
		// Send created customer to client
		res.json(result);
	});
};
 

exports.findAll = (req, res) => {
	Empleado.findAll().then(empleados => {
	  // Send all empleados to Client
	  res.json(empleados);
	});
};

// Find a Empleado by Id
exports.findById = (req, res) => {	
	Empleado.findById(req.params.empleadoId).then(empleado => {
		res.json(empleado);
	})
};
 
// Update a Customer
exports.update = (req, res) => {
	let empleado = req.body;
	let id = req.body.id;
	Empleado.update(empleado, 
					 { where: {id: id} }
				   ).then(() => {
						 res.status(200).json({msg:"update exitoso de empelado con id = " + id});
				   });	
};
 
// Delete a Empleado by Id
exports.delete = (req, res) => {
	const id = req.params.empleadoId;
	Empleado.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).json({msg:'Delete exitoso de empleado con id = ' + id});
	});
};