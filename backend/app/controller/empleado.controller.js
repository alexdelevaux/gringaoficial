const db = require('../config/db.config.js');
const Empleado = db.empleados;

// Post un Empleado
exports.create = (req, res) => {
    console.log('Guardando empelado en la db');
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

// Busca un empleado por el id
exports.findById = (req, res) => {
    Empleado.findById(req.params.idEmpleado).then(empleado => {
            res.json(empleado);
        })
        /* 
        	Empleado.findById(req.params.empleadoId).then(empleado => {
        		res.json(empleado);
        	}) */
};

// Update a Customer
exports.update = (req, res) => {
    let empleado = req.body;
    //	let id = req.body.id;

    let id = req.body.idEmpleado;
    Empleado.update(empleado, { where: { idEmpleado: id } }).then(() => {
        res.status(200).json({ msg: "update exitoso de empelado con id = " + id });
    });
};

// Delete a Empleado by Id
exports.delete = (req, res) => {
    const id = req.params.empleadoId;
    Empleado.destroy({
        where: { idEmpleado: id }
    }).then(() => {
        res.status(200).json({ msg: 'Delete exitoso de empleado con id = ' + id });
    });
};

// Busca todos los empleados que tengan el apellido enviado
exports.findByApellido = (req, res) => {
    console.log('Busca por Apellido');
    Empleado.findAll({ where: { apellido: req.params.apellido } }).then(empleados => {
        // Send all empleados to Client
        res.json(empleados);
    });
};