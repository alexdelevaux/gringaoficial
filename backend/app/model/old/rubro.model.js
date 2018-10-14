
module.exports = (sequelize, Sequelize) => {
	const Rubro = sequelize.define('rubro', {
		
        rubro: {
            type: Sequelize.STRING,
            allowNull: false,
			unique: true
        },

        estado: {
            type: Sequelize.CHAR,
			allowNull: false,
        }
});
    
	
	return Rubro;
}
