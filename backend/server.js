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
  
// Borra las tablas
// force: true will drop the table if it already exists
/* db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
  initial();
}); */

// No borra las tablas

  db.sequelize.sync().then(() => {
//  console.log('Drop and Resync with { force: true }');
  console.log('Sync sin force');
  initial();
});


//  Viejo
/* require('./app/route/rubro.route.js')(app);
require('./app/route/producto.route.js')(app);
require('./app/route/empleado.route.js')(app);
require('./app/route/venta.route.js')(app);
  */

//  Nuevo
require('./app/route/rubro.route.js')(app);
require('./app/route/producto.route.js')(app);
require('./app/route/empleado.route.js')(app);
require('./app/route/venta.route.js')(app);
 


// Crea un Server
var server = app.listen(8080, function () {
 
  let host = server.address().address
  let port = server.address().port

  console.log("App listening at http://%s:%s", host, port);
})


// Esta funcion es para probar que las tablas reciben los datos bien
 function initial(){

   
  
  let empleados = [
    {
      idEmpleado: 20,
      nombre: "Fernanda",
      apellido: "Valle",
      usuario: "fer64",
      contrasena: "pswfervalle",
      rol: "a",
      estado: "a",
      observaciones: "No trabaja los sabados",

    },
    {
      idEmpleado: 40,
      nombre: "Mario",
      apellido: "Mozo",
      usuario: "mariomozo",
      contrasena: "pswmario",
      rol: "v",
      estado: "a",
      observaciones: "tiene llave",
    }
   
  ]
   //Guarda los datos en MySQL
     const Empleado = db.empleados;
    for (let i = 0; i < empleados.length; i++) { 
      Empleado.create(empleados[i]);  

    }

    // Prueba de RAW query
/*     db.sequelize.query("UPDATE empleados SET apellido = 'apllidoNuevo' WHERE nombre = 'Magdalena'").spread((results, metadata) => {
      // Results will be an empty array and metadata will contain the number of affected rows.
      console.log('#############HACE EL QUERY########');
      console.log('resultado : ', results.nombre);
      console.log('metadata : ', metadata);
      
    }) */


  }



    /*
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
      const Venta = db.ventas;
     for (let i = 0; i < ventas.length; i++) { 
       Venta.create(ventas[i]);  

     }

let rubros = [
        {
          rubro: "Lacteo",
          estado: 'a',
        },
     
      ]

      const Rubro = db.rubros;
      for (let i = 0; i < rubros.length; i++) { 
        Rubro.create(rubros[i]);  
      }
 
// PRODUCTOS
  let productos = [
    {
      producto: "Magdalena",
      estado: 'a',
      precioVenta: 124.20,
      //fechaActualizacion: "2018-09-09",
      observaciones: "bueno para cardíacos",
      rubroId: 1
    }
 
  ]
     //Guarda los datos en MySQL
      const Producto = db.productos;
     for (let i = 0; i < productos.length; i++) { 
       Producto.create(productos[i]);  
     }
  }  */