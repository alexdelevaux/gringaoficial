var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())

const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

const db = require('./app/config/db.config.js');
  
// force: true will drop the table if it already exists
/* db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
  initial();
}); */

  db.sequelize.sync().then(() => {
//  console.log('Drop and Resync with { force: true }');
  initial();
});


require('./app/route/empleado.route.js')(app);
require('./app/route/venta.route.js')(app);
 
// Create a Server
var server = app.listen(8080, function () {
 
  let host = server.address().address
  let port = server.address().port

  console.log("App listening at http://%s:%s", host, port);
})


// Esta funcion es para probar que las tablas reciben los datos bien
 function initial(){

  
  let empleados = [
    {
      nombre: "Magdalena",
      apellido: "Paez",
      usuario: "magapaez",
      contrasena: "psqmagapaez",
      rol: "v",
      estado: "a",
      observaciones: "llega a las 9 los miercoles",

    },
    {
      nombre: "Juana",
      apellido: "Laloca",
      usuario: "loquita123",
      contrasena: "psqloquita",
      rol: "a",
      estado: "a",
      observaciones: "tiene llave",
    }
   
  ]
   //Guarda los datos en MySQL
/*     const Empleado = db.empleados;
    for (let i = 0; i < empleados.length; i++) { 
      Empleado.create(empleados[i]);  
    } */


// VENTAS
  let ventas = [
    {
      empleadoId: 1,
      fecha: "2018-09-03",
      total: 512,
      observaciones: "-",

    },
    {
      empleadoId: 2,
      fecha: "2018-09-03",
      total: 132,
      observaciones: "descuento $10",
    },
   
  ]
     //Guarda los datos en MySQL
/*      const Venta = db.ventas;
     for (let i = 0; i < ventas.length; i++) { 
       Venta.create(ventas[i]);  
     } */



// PRODUCTOS
  let productos = [
    {
      producto: "Magdalena",
      estado: 'a',
      precioVenta: 124.20,
      //fechaActualizacion: "2018-09-09",
      observaciones: "bueno para cardíacos",
    },
 
  ]
     //Guarda los datos en MySQL
/*      const Producto = db.productos;
     for (let i = 0; i < productos.length; i++) { 
       Producto.create(productos[i]);  
     }
 */

} 