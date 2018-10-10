module.exports = (sequelize, Sequelize) => {
	const Empleado = sequelize.define('empleado', {
		
		nombre: {
			type: Sequelize.STRING,
			allowNull: false

	  },
	  apellido: {
			type: Sequelize.STRING,
			allowNull: false

		},

		usuario: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true
		},

		contrasena: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: { len: {args: [6, 20], msg: "Contrasena insegura."}}
	  },

		rol: {
			type: Sequelize.CHAR,
			allowNull: false
		},

		estado: {
			type: Sequelize.CHAR,
			allowNull: false
		},

		observaciones: {
			type: Sequelize.STRING,
			allowNull: true
			
		}
		
	});
	
/*   Empleado.associate = (models) => {
    Empleado.hasMany(models.venta);
	}; */

	
	return Empleado;
}