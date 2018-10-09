module.exports = (sequelize, Sequelize) => {
	const Empleado = sequelize.define('empleado', {
	  nombre: {
			type: Sequelize.STRING
	  },
	  apellido: {
			type: Sequelize.STRING
	  },
	  edad: {
		  type: Sequelize.INTEGER
	  }
	});
	
	return Empleado;
}