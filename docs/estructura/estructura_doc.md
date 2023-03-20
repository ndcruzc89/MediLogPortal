# Estructura de la API

La estructura de carpetas de la API esta distribuida de la siguiente manera:

- ***docs***: contiene todas las carpetas con archivos de documentación del proyecto.
  
- ***src\config***: aquí están todos los archivos de configuración, como: 
  - bcrypt.config, que se encarga de encriptar y comparar las contraseñas.
  - config, donde se encuentra la configuración de variables de la base de datos.
  - jwtj, que contiene las funciones para generar y verificar un token.
  - mail, que se encarga de enviar un mensaje a un correo electrónico. 

- ***src\controllers***: en este apartado están todos controladores de la API, que es donde se manejan todas las solicitudes a través de los endpoints. 

- ***src\database***: aquí se encuentra el archivo .sql de la base de datos usada en la API. 

- ***src\helpers***: contiene un archivo que se encarga de validar si hay errores en los datos de entrada proporcionados por el usuario utilizando el paquete "express-validator".

- ***src\libs***: aquí esta el archivo con la biblioteca de ORM para interactuar con la base de datos relacional, que en este caso es Postgresql.
  
- ***src\models***: contiene todos los archivos del modelo de datos con sus respectivas relaciones. Además, hay un archivo index donde se inicializan todos los modelos y se establecen todas las asociaciones entre si.

- ***src\routes***: en este apartado se establecen los métodos de las solicitudes y una parte de la url de los endpoints para cada ruta. Además, hay un archivo index, donde se establecen los nombres principales que va a tener cada url de los endpoints. 

- ***src\validators***: aquí están los archivos con los respectivos campos de validación de entrada de datos para determinadas rutas que lo requieren.

- ***src\app.js***: es el archivo principal, donde se inicializa la API.

- ***.env***: en este archivo se encuentran las variables de entorno con información importante de la base de datos y la información del correo que se va a encargar de enviar los mensajes al correo destino.

- ***package.json***: contiene todas dependencias necesarias para que funcione la API.