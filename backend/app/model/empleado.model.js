module.exports = (sequelize, Sequelize) => {
	const Empleado = sequelize.define('empleado', {
		
		nombre: {
			type: Sequelize.STRING
	  },
	  apellido: {
			type: Sequelize.STRING
		},
		usuario: {
			type: Sequelize.STRING
		},
		contrasena: {
			type: Sequelize.STRING
	  },
	  rol: {
		  type: Sequelize.CHAR
		},
		estado: {
		  type: Sequelize.CHAR
		},
		observaciones: {
		  type: Sequelize.STRING
		}
		
	});
	
	return Empleado;
}