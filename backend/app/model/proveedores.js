/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('proveedores', {
		idProveedor: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			field: 'idProveedor'
		},
		razonSocial: {
			type: DataTypes.STRING(45),
			allowNull: false,
			unique: true,
			field: 'razonSocial'
		},
		cuit: {
			type: DataTypes.STRING(12),
			allowNull: true,
			unique: true,
			field: 'CUIT'
		},
		telefono: {
			type: DataTypes.STRING(15),
			allowNull: true,
			field: 'telefono'
		},
		direccion: {
			type: DataTypes.STRING(50),
			allowNull: true,
			field: 'direccion'
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
		tableName: 'proveedores'
	});
};
