/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('productos', {
		idProducto: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			field: 'idProducto'
		},
		idRubro: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'rubros',
				key: 'idrubro'
			},
			field: 'idRubro'
		},
		producto: {
			type: DataTypes.STRING(50),
			allowNull: false,
			unique: true,
			field: 'producto'
		},
		estado: {
			type: DataTypes.CHAR(5),
			allowNull: true,
			defaultValue: 'a',
			field: 'estado'
		},
		precioVenta: {
			type: DataTypes.DECIMAL,
			allowNull: true,
			field: 'precioVenta'
		},
		fechaActualizacion: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'fechaActualizacion'
		},
		observaciones: {
			type: DataTypes.STRING(45),
			allowNull: true,
			field: 'observaciones'
		}
	}, {
		tableName: 'productos'
	});
};
