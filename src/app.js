let express = require("express");
let dotenv = require("dotenv");
let cors = require("cors");

// Configuración de puerto
const port = process.env.PORT || 4000;

// Importar rutas
const routerApi = require('./routes');

// Cargar variables de entorno
dotenv.config();

// Crear instancia de la aplicación utilizando express()
const app = express();


// Uso de CORS y Json
app.use(cors());
app.use(express.json());

// Escuchar el puerto
app.listen(port, () => {
    console.log("Conectado al puerto " + port);
  });

// Cargar las rutas a la aplicación
routerApi(app);

// Ruta de inicio para la aplicación
app.get('/', (req,res) => {
  res.send('API REST para un sistema de gestión de historia clínica centralizada');
})