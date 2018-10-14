/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('compras', {
		idCompra: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			field: 'idCompra'
		},
		idProveedor: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'proveedores',
				key: 'idproveedor'
			},
			field: 'idProveedor'
		},
		idPedido: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'pedidos',
				key: 'idpedido'
			},
			field: 'idPedido'
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
		}
	}, {
		tableName: 'compras'
	});
};
