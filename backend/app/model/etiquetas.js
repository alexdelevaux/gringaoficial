/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('etiquetas', {
		idEtiqueta: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			field: 'idEtiqueta'
		},
		idProducto: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'productos',
				key: 'idproducto'
			},
			field: 'idProducto'
		},
		etiqueta: {
			type: DataTypes.STRING(45),
			allowNull: false,
			unique: true,
			field: 'etiqueta'
		},
		estado: {
			type: DataTypes.CHAR(5),
			allowNull: true,
			defaultValue: 'a',
			field: 'estado'
		}
	}, {
		tableName: 'etiquetas'
	});
};
