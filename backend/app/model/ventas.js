/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('ventas', {
		idVenta: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			field: 'idVenta'
		},
		idEmpleado: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'empleados',
				key: 'idempleado'
			},
			field: 'idEmpleado'
		},
		fecha: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'fecha'
		},
		total: {
			type: DataTypes.DECIMAL,
			allowNull: false,
			field: 'total'
		},
		observaciones: {
			type: DataTypes.STRING(50),
			allowNull: true,
			defaultValue: 'null',
			field: 'observaciones'
		}
	}, {
		tableName: 'ventas'
	});
};
