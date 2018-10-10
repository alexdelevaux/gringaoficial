
module.exports = (sequelize, Sequelize) => {
	const Venta = sequelize.define('venta', {
		
        fecha: {
            type: Sequelize.DATE
        },
        total: {
            type: Sequelize.DECIMAL
        },
        observaciones: {
            type: Sequelize.STRING
        }
});
    
	
	return Venta;
}
