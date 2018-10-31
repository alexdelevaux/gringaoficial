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

    // pruebaQuery();

    consultas();
});



//  Nuevo
require('./app/route/rubro.route.js')(app);
require('./app/route/producto.route.js')(app);
require('./app/route/etiqueta.route.js')(app);
require('./app/route/empleado.route.js')(app);
require('./app/route/venta.route.js')(app);
require('./app/route/proveedor.route.js')(app);
require('./app/route/lineas_venta.route.js')(app);
require('./app/route/pedido.route.js')(app);

/*
require('./app/route/compra.route.js')(app);
require('./app/route/lineas_pedido.route.js')(app);
require('./app/route/lineas_compra.route.js')(app);
 
 */

// Crea un Server
var server = app.listen(8080, function() {

    let host = server.address().address
    let port = server.address().port

    console.log("App listening at http://%s:%s", host, port);
})

// Funcion de prueba. Genera datos para poblar db
function initial() {

    //     let empleados = [{
    //                 idEmpleado: 2,
    //                 nombre: "Fernanda",
    //                 apellido: "Valle",
    //                 usuario: "fer64",
    //                 contrasena: "pswfervalle123",
    //                 rol: "a",
    //                 estado: "a",
    //                 observaciones: "No trabaja los sabados",

    //             },
    //             {
    //                 idEmpleado:


    //                 nombre: "Mario",
    //                 apellido: "Mozo",
    //                 usuario: "mariomozo",
    //                 contrasena: "pswmario",
    //                 rol: "v",
    //                 estado: "a",
    //                 observaciones: "tiene llave",
    //             }

    //         ]
    //         //Guarda los datos en MySQL
    //     const Empleado = db.empleados;
    //     for (let i = 0; i < empleados.length; i++) {
    //         Empleado.create(empleados[i]);

    //     }



    //     // VENTAS
    //     let ventas = [{
    //                 idVenta: 1,
    //                 idEmpleado: 1,
    //                 fecha: "2018-09-03",
    //                 total: 512,
    //                 observaciones: "-",

    //             },
    //             {
    //                 idVenta: 2,
    //                 idEmpleado: 2,
    //                 fecha: "2018-09-03",
    //                 total: 132,
    //                 observaciones: "descuento $10",
    //             },

    //         ]
    //         //Guarda los datos en MySQL
    //     const Venta = db.ventas;
    //     for (let i = 0; i < ventas.length; i++) {
    //         Venta.create(ventas[i]);

    //     }

    //     let rubros = [{
    //             idRubro: 2,
    //             rubro: "Fiambre",
    //             estado: 'a',
    //         },

    //     ]

    //     const Rubro = db.rubros;
    //     for (let i = 0; i < rubros.length; i++) {
    //         Rubro.create(rubros[i]);
    //     }

    //     // PRODUCTOS
    //     let productos = [{
    //                 idProducto: 1,
    //                 producto: "Magdalena",
    //                 estado: 'a',
    //                 precioVenta: 124.20,
    //                 //fechaActualizacion: "2018-09-09",
    //                 observaciones: "bueno para cardíacos",
    //                 idRubro: 1
    //             }

    //         ]
    //         //Guarda los datos en MySQL
    //     const Producto = db.productos;
    //     for (let i = 0; i < productos.length; i++) {
    //         Producto.create(productos[i]);
    //     }
    // }



    // Prueba de RAW query
    /*     // Funciona
        db.sequelize.query("UPDATE empleados SET apellido = 'apllidoNuevo' WHERE idEmpleado = 20").spread((results, metadata) => {
          // Results will be an empty array and metadata will contain the number of affected rows.
          console.log('#############HACE EL QUERY########');
          console.log('metadata : ', metadata);
          
        }); */


    //  db.sequelize.query('CALL asp_altaEmpleado();').spread(
    //   console.log('+++++++++++++++ LLAMA SP ++++++++')
    // ); 
    // db.sequelize.query(
    //     `
    //       SET @resultado='';
    //       CALL asp_altaEmpleado('marianita', 'pswmarianita','mariana', 'lopez', 'a', null, 'v', @resultado);
    //       SELECT @resultado;
    //       `
    // ).spread(
    //     console.log('+++++++ VA A ASP_EMPELADP +++++++++')
    // );


    // let resultado = '';

    // db.sequelize.query(
    //     'CALL asp_altaEmpleado(:params )', {
    //         replacements: {
    //             params: ['marianita', 'pswmarianita', 'mariana', 'lopez', 'a', null, 'v', resultado]
    //         }
    //     })

    // console.log('**-*-***-*-*-*  VA A ASP_EMPELADP *-*-*-*-*-*-*');

    // let resultado = '';
    // let sql = 'CALL asp_altaEmpleado(?)';
    // db.sequelize.query(
    //     sql, ['marianita', 'pswmarianita', 'mariana', 'lopez', 'a', null, 'v', resultado],
    //     (error, results, fields) => {
    //         if (error) {
    //             return console.error(error.message);
    //         }
    //         console.log(results[0]);
    //     });

}

// Prueba como llamar a un sp
function pruebaQuery() {

    // db.sequelize.query(
    //     'CALL pruebaSP(:valor, :valor2 )', {
    //         replacements: {
    //             valor: 'true',
    //             valor2: 'valor2'
    //         }
    //     })

    // Tipo Promesa
    db.sequelize
        .query('CALL pruebaSP(:valor, :valor2 )', { replacements: { valor: "me@jsbot.io", valor2: 'pwd' } })
        .then(v => console.log(v));

    // Tipo spread
    // Me devuelve solo 1
    // db.sequelize
    //     .query('CALL pruebaSP(:valor, :valor2 )', { replacements: { valor: "me@jsbot.io", valor2: 'pwd' } })
    //     .spread(v => console.log(v));
}

// distintas pruebas de queries
function consultas() {

}