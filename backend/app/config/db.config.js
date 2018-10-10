const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
//db.customers = require('../model/customer.model.js')(sequelize, Sequelize);
db.empleados = require('../model/empleado.model.js')(sequelize, Sequelize);
db.ventas = require('../model/venta.model.js')(sequelize, Sequelize);
db.productos = require('../model/producto.model.js')(sequelize, Sequelize);



// relacion entre tablas empleados y ventas
// Empleados (1-N) Ventas
db.empleados.hasMany(db.ventas);
db.ventas.belongsTo(db.empleados);






module.exports = db;