const db = require('../config/db.config.js');
const Etiqueta = db.etiquetas;

// Post de un Etiqueta
exports.create = (req, res) => {	
	// Guarda en MySQL
	let etiqueta = req.body;
	Etiqueta.create(etiqueta).then(result => {		
		// Envia el etiqueta creado al cliente
		res.json(result);
	});
};
 

exports.findAll = (req, res) => {
	Etiqueta.findAll().then(etiquetas => {
	  // Envia los etiquetas al client
	  res.json(etiquetas);
	});
};

// Busca un Etiqueta por Id
exports.findById = (req, res) => {	
	Etiqueta.findById(req.params.etiquetaId).then(etiqueta => {
		res.json(etiqueta);
	})
};
 
// Update de un etiqueta
exports.update = (req, res) => {
	let etiqueta = req.body;
	let id = req.body.id;
	Etiqueta.update(etiqueta, 
					 { where: {id: id} }
				   ).then(() => {
						 res.status(200).json({msg:"Update exitoso de etiqueta con id = " + id});
				   });	
};
 
// Elimina un Etiqueta por Id
exports.delete = (req, res) => {
	const id = req.params.etiquetaId;
	Etiqueta.destroy({
	  where: { id: id }
	}).then(() => {
	  res.status(200).json({msg:'Eliminacion exitosa de etiqueta con id = ' + id});
	});
};