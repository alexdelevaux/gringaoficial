/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('lineasPedido', {
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
		idPedido: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'pedidos',
				key: 'idpedido'
			},
			field: 'idPedido'
		},
		idProveedor: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'pedidos',
				key: 'idproveedor'
			},
			field: 'idProveedor'
		},
		cantidad: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			defaultValue: '1',
			field: 'cantidad'
		},
		precioPedido: {
			type: DataTypes.DECIMAL,
			allowNull: true,
			field: 'precioPedido'
		}
	}, {
		tableName: 'lineasPedido'
	});
};
