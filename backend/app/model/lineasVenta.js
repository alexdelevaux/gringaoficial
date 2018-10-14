/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('lineasVenta', {
		idVenta: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'ventas',
				key: 'idventa'
			},
			field: 'idVenta'
		},
		idProducto: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'productos',
				key: 'idproducto'
			},
			field: 'idProducto'
		},
		cantidad: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			defaultValue: '1',
			field: 'cantidad'
		},
		precioVenta: {
			type: DataTypes.DECIMAL,
			allowNull: true,
			field: 'precioVenta'
		}
	}, {
		tableName: 'lineasVenta'
	});
};
