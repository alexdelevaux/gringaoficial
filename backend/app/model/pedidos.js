/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('pedidos', {
		idPedido: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			field: 'idPedido'
		},
		idProveedor: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'proveedores',
				key: 'idproveedor'
			},
			field: 'idProveedor'
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
			allowNull: true,
			field: 'total'
		},
		estado: {
			type: DataTypes.CHAR(5),
			allowNull: false,
			defaultValue: 'p',
			field: 'estado'
		},
		observaciones: {
			type: DataTypes.STRING(50),
			allowNull: true,
			defaultValue: 'null',
			field: 'observaciones'
		}
	}, {
		tableName: 'pedidos'
	});
};
