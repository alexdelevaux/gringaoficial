module.exports = (sequelize, Sequelize) => {
	const Producto = sequelize.define('producto', {
		
		producto: {
			type: Sequelize.STRING,
            allowNull: false,
			unique: true
        },
      
	    estado: {
			type: Sequelize.CHAR,
            allowNull: false,
		},

		precioVenta: {
			type: Sequelize.DECIMAL,
			allowNull: false,
		},
// Este campo no hace falta por UpdatedAt 
/* 		fechaActualizacion: {
			type: Sequelize.DATE,
			allowNull: false,
	    },
 */
		observaciones: {
			type: Sequelize.STRING,
			allowNull: true
		}
		
	});
	
	
	return Producto;
}