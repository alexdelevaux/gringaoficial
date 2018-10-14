const env = {
  database: 'gringa',
  //database: 'proyecto',
  username: 'root',
// contrasena ale
//  password: 'password',

// contrasena fer
  password: 'password',
  host: 'localhost',
  dialect: 'mysql',
  pool: {
	  max: 5,
	  min: 0,
	  acquire: 30000,
	  idle: 10000
  }
};




module.exports = env;