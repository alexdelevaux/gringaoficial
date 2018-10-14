/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('rubros', {
		idRubro: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			field: 'idRubro'
		},
		rubro: {
			type: DataTypes.STRING(45),
			allowNull: false,
			unique: true,
			field: 'rubro'
		},
		estado: {
			type: DataTypes.CHAR(5),
			allowNull: true,
			defaultValue: 'a',
			field: 'estado'
		}
	}, {
		tableName: 'rubros'
	});
};
