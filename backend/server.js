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
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
  initial();
});

require('./app/route/empleado.route.js')(app);
 
// Create a Server
var server = app.listen(8080, function () {
 
  let host = server.address().address
  let port = server.address().port

  console.log("App listening at http://%s:%s", host, port);
})

function initial(){

  let empleados = [
    {
      nombre: "Magdalena",
      apellido: "Paez",
      usuario: "magapaez",
      contrasena: "pswmaga1",
      rol: "v",
      estado: "a",
      observaciones: "llega a las 9 los miercoles",

    },
    {
      nombre: "florencia",
      apellido: "gonzalez",
      usuario: "florgon",
      contrasena: "pswflorgon1",
      rol: "a",
      estado: "a",
      observaciones: "tiene llave",

    }
   
  ]

  // Init data -> save to MySQL
  const Empleado = db.empleados;
  for (let i = 0; i < empleados.length; i++) { 
    Empleado.create(empleados[i]);  
  }
}