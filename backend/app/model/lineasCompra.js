/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('lineasCompra', {
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
		idCompra: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'compras',
				key: 'idcompra'
			},
			field: 'idCompra'
		},
		cantidad: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			defaultValue: '1',
			field: 'cantidad'
		},
		precioCompra: {
			type: DataTypes.DECIMAL,
			allowNull: true,
			field: 'precioCompra'
		}
	}, {
		tableName: 'lineasCompra'
	});
};
