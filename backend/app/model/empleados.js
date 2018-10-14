/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('empleados', {
		idEmpleado: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			field: 'idEmpleado'
		},
		nombre: {
			type: DataTypes.STRING(45),
			allowNull: false,
			field: 'nombre'
		},
		apellido: {
			type: DataTypes.STRING(45),
			allowNull: false,
			field: 'apellido'
		},
		usuario: {
			type: DataTypes.STRING(45),
			allowNull: false,
			unique: true,
			field: 'usuario'
		},
		contrasena: {
			type: DataTypes.STRING(45),
			allowNull: false,
			field: 'contrasena'
		},
		rol: {
			type: DataTypes.CHAR(5),
			allowNull: false,
			defaultValue: 'v',
			field: 'rol'
		},
		estado: {
			type: DataTypes.CHAR(5),
			allowNull: false,
			defaultValue: 'a',
			field: 'estado'
		},
		observaciones: {
			type: DataTypes.STRING(45),
			allowNull: true,
			defaultValue: 'null',
			field: 'observaciones'
		}
	}, {
		tableName: 'empleados'
	});
};
