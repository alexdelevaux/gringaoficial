const db = require('../config/db.config.js');
const Rubro = db.rubros;

// Post de un Rubro
exports.create = (req, res) => {	
	// Guarda en MySQL
	let rubro = req.body;
	Rubro.create(rubro).then(result => {		
		// Envia el rubro creado al cliente
		res.json(result);
	});
};

exports.findAll = (req, res) => {
	Rubro.findAll().then(rubros => {
	  // Envia los rubros al client
	  res.json(rubros);
	});
};

// Busca un Rubro por Id
exports.findById = (req, res) => {	
	Rubro.findById(req.params.rubroId).then(rubro => {
		res.json(rubro);
	})
};
 
// Update de un rubro
exports.update = (req, res) => {
	let rubro = req.body;
	let id = req.body.id;
	Rubro.update(rubro, 
					 { where: {id: id} }
				   ).then(() => {
						 res.status(200).json({msg:"Update exitoso de rubro con id = " + id});
				   });	
};
 
// Elimina un Rubro por Id
exports.delete = (req, res) => {
	const id = req.params.rubroId;
	Rubro.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).json({msg:'Eliminacion exitosa de rubro con id = ' + id});
	});
};