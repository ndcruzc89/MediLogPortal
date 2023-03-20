# Desarrollo Backend

## Requerimientos y Dependencias

El backend se desarrollo usando:

- Node.js (Recomendada: vs 16.18.0)
- Express (Se instala en las dependencias)

Para instalar las dependencias se debe ejecutar en la consola el comando **_npm install_**. Luego de esto, el archivo _package.json_ debe quedar de la siguiente manera:

```json
{
  "name": "medilogportal",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "nodemon src/app.js",
    "prod": "node src/app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Nelson Cruz",
  "license": "ISC",
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "express-validator": "^6.15.0",
    "jsonwebtoken": "^9.0.0",
    "moment": "^2.29.4",
    "nodemailer": "^6.9.1",
    "pdfkit": "^0.13.0",
    "pg": "^8.10.0",
    "pg-hstore": "^2.3.4",
    "sequelize": "^6.29.1",
    "uuid": "^9.0.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.21"
  }
}
```

<br>

En donde en el apartado de **_dependencies_** se pueden detallar todas las dependencias necesarias para ejecutar el proyecto y en el apartado de **_devDependencies_** se puede ver la dependencia usada en la fase de desarrollo, que este caso es _nodemon_

---

## Puerto de la API

La API esta configurada en el puerto 4000.

---

## Validaciones de las solicitudes a la API
Para las solicitudes POST y PUT se validan todos los datos del json haciendo uso de express-validator y de esta manera asegurar que se los datos tengan el formato correcto. 

---

## Endpoints de la API

Los endpoints de la API están estructurados de la siguiente manera:

### Paciente

- El endpoint ***http://localhost:4000/api/v1/patient/signup*** con el método POST, que se usa para que el usuario paciente pueda registrarse en la aplicación. Antes de que la petición llegue al controlador se validan todos los datos del json.

  Se prueba este endpoint con Postman con los siguientes casos de prueba:

    - Enviando un json con datos válidos para el registro del paciente:
      ```json
      {
          "identification": "1160354598",
          "email": "david.gulgowski@ethereal.email",
          "phone": "3594351526",
          "password": "David#1119",
          "name": "David",
          "lastName": "Gulgowski",
          "secondLastName": "Romaguera",
          "address": "kra 60 # 53-64",
          "birthdate": "1996-11-19"
      }
      ```

      Se tiene el siguiente resultado:
      ```json
      {
          "success": true,
          "msg": "Paciente registrado con éxito"
      }
      ```

    <br>

    -  Enviando un json con una identificación que ya está registrada en el sistema:
        ```json
        {
            "identification": "1160354598",
            "email": "cathy.rau@ethereal.email",
            "phone": "3152659435",
            "password": "Cathy#12",
            "name": "Cathy",
            "lastName": "Rau",
            "secondLastName": "Salamanca",
            "address": "kra 57 # 15-90",
            "birthdate": "2000-07-12"
        }
        ```

        Se tiene el siguiente resultado:
        ```json
        {
            "success": false,
            "msg": "Error al registrar el paciente: Ya existe un usuario asociado a esta identificación"
        }
        ```

    <br>

    -  Enviando un json con un correo que ya está registrado en el sistema:
        ```json
        {
            "identification": "1354598160",
            "email": "david.gulgowski@ethereal.email",
            "phone": "3594351526",
            "password": "David#12",
            "name": "David",
            "lastName": "Rau",
            "secondLastName": "Salamanca",
            "address": "kra 64 # 15-90",
            "birthdate": "1886-07-12"
        }
        ```

        Se tiene el siguiente resultado:
        ```json
        {
            "success": false,
            "msg": "Error al registrar el paciente: Ya existe un usuario asociado a este email"
        }
        ```

    -  Enviando un json con un nombre, primer apellido y segundo apellido que ya están registrados en el sistema:
        ```json
        {
            "identification": "1354598160",
            "email": "david.15@ethereal.email",
            "phone": "3594351526",
            "password": "David#12",
            "name": "David",
            "lastName": "Gulgowski",
            "secondLastName": "Romaguera",
            "address": "kra 64 # 15-90",
            "birthdate": "1886-07-12"
        }
        ```

        Se tiene el siguiente resultado:
        ```json
        {
            "success": false,
            "msg": "Error al registrar el paciente: Ya existe un paciente asociado con el mismo nombre, primer y segundo apellido"
        }
        ```

- El endpoint ***http://localhost:4000/api/v1/patient/confirm/:token*** con el método GET, para que el usuario paciente pueda confirmar el token de registro.

  Se prueba este endpoint con Postman con los siguientes casos de prueba:

    - Con una url que contiene el token que fue enviado al correo y que no ha expirado ***http://localhost:4000/api/v1/patient/confirm/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiZGF2aWQuZ3VsZ293c2tpQGV0aGVyZWFsLmVtYWlsIiwidXVpZENvZGUiOiJmMjk1YWM3NS1kZTkxLTQ4OTYtYmI5MC01OTJiOWJjMmQzOGQifSwiaWF0IjoxNjc5MDkzMTczLCJleHAiOjE2NzkwOTY3NzN9.xGKJlDMBrncSnZHkYdysdygNWq6dDuKb9z2J3mHWD7s***, se tiene el siguiente resultado:
      ```json
      {
          "success": true,
          "msg": "Confirmación exitosa del paciente"
      }
      ```
      <br>

    - Con una url con un token incorrecto ***http://localhost:4000/api/v1/patient/confirm/eyJh***, se tiene el siguiente resultado:
      ```json
      {
          "success": false,
          "msg": "Error al confirmar el paciente: jwt malformed"
      }
      ```
    <br>

- El endpoint ***http://localhost:4000/api/v1/patient/signin*** con el método POST, que se usa para que el usuario paciente pueda iniciar sesión en la aplicación. Es importante mencionar que primero debe confirmar el registro para que le sea permitido el ingreso al sistema. Antes de que la petición llegue al controlador se validan todos los datos del json, que en este caso son la identificación y la contraseña.

  Se prueba este endpoint con Postman con los siguientes casos de prueba:

    - Con el registro confirmado, se envía un json con datos válidos para el inicio de sesión del paciente:
      ```json
      {
          "identification": "1160354598",
          "password": "David#1119"
      }
      ```

      Se tiene el siguiente resultado:
      ```json
      {
          "success": true,
          "msg": "Login exitoso",
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiMSIsImlkZW50aWZpY2F0aW9uIjoiMTE2MDM1NDU5OCIsImVtYWlsIjoiZGF2aWQuZ3VsZ293c2tpQGV0aGVyZWFsLmVtYWlsIiwicGhvbmUiOiIzNTk0MzUxNTI2IiwibmFtZSI6IkRhdmlkIiwibGFzdE5hbWUiOiJHdWxnb3dza2kiLCJzZWNvbmRMYXN0TmFtZSI6IlJvbWFndWVyYSIsImFkZHJlc3MiOiJrcmEgNjAgIyA1My02NCIsImJpcnRoZGF0ZSI6IjE5OTYtMTEtMTkifSwiaWF0IjoxNjc5MDk1NDExLCJleHAiOjE2NzkwOTkwMTF9.P2IraJUuWAcK6ytYLiwm5I73x5svCeIHHuMsC8caCQ8"
      }
      ```
      <br>

    - Enviando un json con una identificación que no existe en el sistema:
      ```json
      {
          "identification": "1459816035",
          "password": "David#1119"
      }
      ```

      Se tiene el siguiente resultado:
      ```json
      {
          "success": false,
          "msg": "Error de inicio de sesión del paciente: No se encontró ningún usuario con esta identificación"
      }
      ```

    <br>

    - Enviando un json con una contraseña incorrecta:
      ```json
      {
          "identification": "1160354598",
          "password": "David#abc23"
      }
      ```

      Se tiene el siguiente resultado:
      ```json
      {
          "success": false,
          "msg": "Error de inicio de sesión del paciente: Contraseña incorrecta"
      }
      ```
    <br>

    - Enviando un json con datos válidos, pero NO se ha confirmado el registro:
      ```json
      {
          "identification": "1160354598",
          "password": "David#1119"
      }
      ```

      Se tiene el siguiente resultado:
      ```json
      {
          "success": false,
          "msg": "Error de inicio de sesión del paciente: El usuario debe confirmar su registro"
      }
      ```
    <br>

- El endpoint ***http://localhost:4000/api/v1/patient/change-password/:id*** con el método PUT, es para que el usuario paciente pueda cambiar su contraseña. Antes de que la petición llegue al controlador se validan todos los datos del json, que en este caso son la contraseña actual y la nueva contraseña. 

  Se prueba este endpoint con Postman con los siguientes casos de prueba:

  - Con una url donde el id es el correspondiente al paciente que está enviando la petición ***http://localhost:4000/api/v1/patient/change-password/1*** y un json con datos válidos para el cambio de contraseña del paciente:
    ```json
    {
        "password": "David#1119",
        "newPassword": "David$11"
    }
    ```

    Se tiene el siguiente resultado:
    ```json
    {
        "success": true,
        "msg": "Contraseña del paciente actualizada con éxito"
    }
    ```

  <br>

  - Con una url donde el id NO existe o NO es el correspondiente al paciente que está enviando la petición ***http://localhost:4000/api/v1/patient/change-password/25*** y un json con datos para el cambio de contraseña del paciente:
    ```json
    {
        "password": "David#1119",
        "newPassword": "David$11"
    }
    ```

    Se tiene el siguiente resultado:
    ```json
    {
        "success": false,
        "msg": "Error al cambiar la contraseña del paciente: El paciente NO existe"
    }
    ```

  <br>

  - Con una url donde el id es el correspondiente al paciente que está enviando la petición ***http://localhost:4000/api/v1/patient/change-password/1*** y un json que contiene la contraseña actual incorrecta:
    ```json
    {
        "password": "David#19",
        "newPassword": "David$11"
    }
    ```

    Se tiene el siguiente resultado:
    ```json
    {
        "success": false,
        "msg": "Error al cambiar la contraseña del paciente: Contraseña incorrecta"
    }
    ```

  <br>

  - Con una url donde el id es el correspondiente al paciente que está enviando la petición ***http://localhost:4000/api/v1/patient/change-password/1*** y un json que contiene la nueva contraseña igual a la contraseña actual:
    ```json
    {
        "password": "David#1119",
        "newPassword": "David#1119"
    }
    ```

    Se tiene el siguiente resultado:
    ```json
    {
        "success": false,
        "msg": "Error al cambiar la contraseña del paciente: La nueva contraseña no puede ser igual a la anterior"
    }
    ```
  <br>

- El endpoint ***http://localhost:4000/api/v1/patient//restore-password*** con el método POST, es para que el usuario paciente pueda enviar el dato de su email y así pueda recuperar su contraseña. Antes de que la petición llegue al controlador se valida el único dato del json, que en este caso es la email. 

  Se prueba este endpoint con Postman con los siguientes casos de prueba:

  - Enviando un json con un email válido para que el usuario paciente recupere su contraseña:
    ```json
    {
        "email": "david.gulgowski@ethereal.email"
    }
    ```

    Se tiene el siguiente resultado:
    ```json
    {
        "success": true,
        "msg": "Token para recuperación de contraseña generado con éxito"
    }
    ```
  <br>

  - Enviando un json con un email que no existe en el sistema:
    ```json
    {
        "email": "raoul.kemmer@ethereal.email"
    }
    ```

    Se tiene el siguiente resultado:
    ```json
    {
        "success": false,
        "msg": "Error al intentar generar el token de recuperación de contraseña del paciente: El usuario NO existe"
    }
    ```
  <br>

- El endpoint ***http://localhost:4000/api/v1/patient/submit-restore-password/:token*** con el método PUT, es para que el usuario paciente pueda enviar el dato de su nueva contraseña de recuperación. Antes de que la petición llegue al controlador se valida el único dato del json, que en este caso es la contraseña. 

  Se prueba este endpoint con Postman con los siguientes casos de prueba:

  - Con una url que contiene el token que fue enviado al correo y que no ha expirado ***http://localhost:4000/api/v1/patient/submit-restore-password/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiZGF2aWQuZ3VsZ293c2tpQGV0aGVyZWFsLmVtYWlsIiwidXVpZENvZGUiOiJmMjk1YWM3NS1kZTkxLTQ4OTYtYmI5MC01OTJiOWJjMmQzOGQifSwiaWF0IjoxNjc5MDk2OTA2LCJleHAiOjE2NzkxMDA1MDZ9.R6ON2P44MpZc5n5W-UibxreNa0xotVCPlOcMElvSXBk*** y un json con datos válidos para la recuperación de contraseña del paciente:
    ```json
    {
        "newPassword": "David##2023"
    }
    ```

    Se tiene el siguiente resultado:
    ```json
    {
        "success": true,
        "msg": "Contraseña del paciente recuperada con éxito"
    }
    ```
  <br>

  - Con una url con un token incorrecto ***http://localhost:4000/api/v1/patient/submit-restore-password/eyJh*** y un json con los datos para la recuperación de contraseña del paciente:
    ```json
    {
        "newPassword": "David##2023"
    }
    ```

    Se tiene el siguiente resultado:
    ```json
    {
        "success": false,
        "msg": "Error al intentar recuperar la contraseña del paciente: jwt malformed"
    }
    ```

### Hospital

- El endpoint ***http://localhost:4000/api/v1/hospital/signup*** con el método POST, que se usa para que el usuario hospital pueda registrarse en la aplicación. Antes de que la petición llegue al controlador se validan todos los datos del json.

  Se prueba este endpoint con Postman con los siguientes casos de prueba:

    - Enviando un json con datos válidos para el registro del hospital:
      ```json
      {
          "identification": "5981160354",
          "email": "micah11@ethereal.email",
          "phone": "3351559426",
          "password": "Micah#1119",
          "name": "Hospital Micah",
          "address": "Cll 31A Bis # 42-64",
          "medicalServices": "Atención de emergencia, cirugía general, pediatría, obstetricia y ginecología, cardiología, neurología, oncología,oftalmología, ortopedia, psiquiatría, médicina general"
      }
      ```

      Se tiene el siguiente resultado:
      ```json
      {
          "success": true,
          "msg": "Hospital registrado con éxito"
      }
      ```

    <br>

    -  Enviando un json con una identificación que ya está registrada en el sistema:
        ```json
        {
            "identification": "5981160354",
            "email": "hospitaldelaesperanza@ethereal.email",
            "phone": "3943515526",
            "password": "HospEsperanza$4368",
            "name": "Hospital de la Esperanza",
            "address": "Cll 42 Bis # 31A-64",
            "medicalServices": "Atención de emergencia, cirugía general, pediatría, obstetricia y ginecología, cardiología, neurología, oncología,oftalmología, ortopedia, psiquiatría"
        }
        ```

        Se tiene el siguiente resultado:
        ```json
        {
            "success": false,
            "msg": "Error al registrar el hospital: Ya existe un usuario asociado a esta identificación"
        }
        ```

    <br>

    -  Enviando un json con un correo que ya está registrado en el sistema:
        ```json
        {
            "identification": "8159160354",
            "email": "micah11@ethereal.email",
            "phone": "3943515526",
            "password": "HospEsperanza$4368",
            "name": "Hospital de la Esperanza",
            "address": "Cll 42 Bis # 31A-64",
            "medicalServices": "Atención de emergencia, cirugía general, pediatría, obstetricia y ginecología, cardiología, neurología, oncología,oftalmología, ortopedia, psiquiatría"
        }
        ```

        Se tiene el siguiente resultado:
        ```json
        {
            "success": false,
            "msg": "Error al registrar el hospital: Ya existe un usuario asociado a este email"
        }
        ```

    -  Enviando un json con un nombre que ya está registrado en el sistema:
        ```json
        {
            "identification": "8159160354",
            "email": "micah589@ethereal.email",
            "phone": "3943515526",
            "password": "Micah#2023",
            "name": "Hospital Micah",
            "address": "Cll 42 Bis # 31A-64",
            "medicalServices": "Atención de emergencia, cirugía general, pediatría, obstetricia y ginecología, cardiología, neurología, oncología,oftalmología, ortopedia, psiquiatría"
        }
        ```

        Se tiene el siguiente resultado:
        ```json
        {
            "success": false,
            "msg": "Error al registrar el hospital: Ya existe un hospital asociado con el mismo nombre"
        }
        ```

- El endpoint ***http://localhost:4000/api/v1/hospital/confirm/:token*** con el método GET, para que el usuario hospital pueda confirmar el token de registro.

  Se prueba este endpoint con Postman con los siguientes casos de prueba:

    - Con una url que contiene el token que fue enviado al correo y que no ha expirado ***http://localhost:4000/api/v1/hospital/confirm/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoibWljYWgxMUBldGhlcmVhbC5lbWFpbCIsInV1aWRDb2RlIjoiYjgwMWJmYjgtNjkxYS00MWIzLTkyNzYtODNmOGZmZTA3NDNmIn0sImlhdCI6MTY3OTEwNTU1NywiZXhwIjoxNjc5MTA5MTU3fQ.-Sx07XjOdXceiUlw_p17RALINcYgsrVKcyG5J4ekzmI***, se tiene el siguiente resultado:
      ```json
      {
          "success": true,
          "msg": "Confirmación exitosa del hospital"
      }
      ```
      <br>

    - Con una url con un token incorrecto ***http://localhost:4000/api/v1/hospital/confirm/eyJh***, se tiene el siguiente resultado:
      ```json
      {
          "success": false,
          "msg": "Error al confirmar el hospital: jwt malformed"
      }
      ```
    <br>

- El endpoint ***http://localhost:4000/api/v1/hospital/signin*** con el método POST, que se usa para que el usuario hospital pueda iniciar sesión en la aplicación. Es importante mencionar que primero debe confirmar el registro para que le sea permitido el ingreso al sistema. Antes de que la petición llegue al controlador se validan todos los datos del json, que en este caso son la identificación y la contraseña.

  Se prueba este endpoint con Postman con los siguientes casos de prueba:

    - Con el registro confirmado, se envía un json con datos válidos para el inicio de sesión del hospital:
      ```json
      {
          "identification": "5981160354",
          "password": "Micah#1119"
      }
      ```

      Se tiene el siguiente resultado:
      ```json
      {
          "success": true,
          "msg": "Login exitoso",
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiMiIsImlkZW50aWZpY2F0aW9uIjoiNTk4MTE2MDM1NCIsImVtYWlsIjoibWljYWgxMUBldGhlcmVhbC5lbWFpbCIsInBob25lIjoiMzM1MTU1OTQyNiIsIm5hbWUiOiJIb3NwaXRhbCBNaWNhaCIsImFkZHJlc3MiOiJDbGwgMzFBIEJpcyAjIDQyLTY0IiwibWVkaWNhbFNlcnZpY2VzIjoiQXRlbmNpw7NuIGRlIGVtZXJnZW5jaWEsIGNpcnVnw61hIGdlbmVyYWwsIHBlZGlhdHLDrWEsIG9ic3RldHJpY2lhIHkgZ2luZWNvbG9nw61hLCBjYXJkaW9sb2fDrWEsIG5ldXJvbG9nw61hLCBvbmNvbG9nw61hLG9mdGFsbW9sb2fDrWEsIG9ydG9wZWRpYSwgcHNpcXVpYXRyw61hIn0sImlhdCI6MTY3OTExMTMyMCwiZXhwIjoxNjc5MTE0OTIwfQ.RmdEgArNaEdPM-zfRn-RowGu1wLGi0pQN54LE5-37A8"
      }
      ```
      <br>

    - Enviando un json con una identificación que no existe en el sistema:
      ```json
      {
          "identification": "8159160354",
          "password": "Micah#1119"
      }
      ```

      Se tiene el siguiente resultado:
      ```json
      {
          "success": false,
          "msg": "Error de inicio de sesión del hospital: No se encontró ningún usuario con esta identificación"
      }
      ```

    <br>

    - Enviando un json con una contraseña incorrecta:
      ```json
      {
          "identification": "5981160354",
          "password": "Micah#2023"
      }
      ```

      Se tiene el siguiente resultado:
      ```json
      {
          "success": false,
          "msg": "Error de inicio de sesión del hospital: Contraseña incorrecta"
      }
      ```
    <br>

    - Enviando un json con datos válidos, pero NO se ha confirmado el registro:
      ```json
      {
          "identification": "5981160354",
          "password": "Micah#1119"
      }
      ```

      Se tiene el siguiente resultado:
      ```json
      {
          "success": false,
          "msg": "Error de inicio de sesión del hospital: El usuario debe confirmar su registro"
      }
      ```
    <br>

- El endpoint ***http://localhost:4000/api/v1/hospital/change-password/:id*** con el método PUT, es para que el usuario hospital pueda cambiar su contraseña. Antes de que la petición llegue al controlador se validan todos los datos del json, que en este caso son la contraseña actual y la nueva contraseña. 

  Se prueba este endpoint con Postman con los siguientes casos de prueba:

  - Con una url donde el id es el correspondiente al hospital que está enviando la petición ***http://localhost:4000/api/v1/hospital/change-password/2*** y un json con datos válidos para el cambio de contraseña del hospital:
    ```json
    {
        "password": "Micah#1119",
        "newPassword": "Micah$$4569"
    }
    ```

    Se tiene el siguiente resultado:
    ```json
    {
        "success": true,
        "msg": "Contraseña del hospital actualizada con éxito"
    }
    ```

  <br>

  - Con una url donde el id NO existe o NO es el correspondiente al hospital que está enviando la petición ***http://localhost:4000/api/v1/hospital/change-password/25*** y un json con datos para el cambio de contraseña del hospital:
    ```json
    {
        "password": "Micah#1119",
        "newPassword": "Micah$$4569"
    }
    ```

    Se tiene el siguiente resultado:
    ```json
    {
        "success": false,
        "msg": "Error al cambiar la contraseña del hospital: El hospital NO existe"
    }
    ```

  <br>

  - Con una url donde el id es el correspondiente al hospital que está enviando la petición ***http://localhost:4000/api/v1/hospital/change-password/2*** y un json que contiene la contraseña actual incorrecta:
    ```json
    {
        "password": "Micah#2023",
        "newPassword": "Micah$$4569"
    }
    ```

    Se tiene el siguiente resultado:
    ```json
    {
        "success": false,
        "msg": "Error al cambiar la contraseña del hospital: Contraseña incorrecta"
    }
    ```

  <br>

  - Con una url donde el id es el correspondiente al hospital que está enviando la petición ***http://localhost:4000/api/v1/hospital/change-password/2*** y un json que contiene la nueva contraseña igual a la contraseña actual:
    ```json
    {
        "password": "Micah#1119",
        "newPassword": "Micah#1119"
    }
    ```

    Se tiene el siguiente resultado:
    ```json
    {
        "success": false,
        "msg": "Error al cambiar la contraseña del hospital: La nueva contraseña no puede ser igual a la anterior"
    }
    ```
  <br>

- El endpoint ***http://localhost:4000/api/v1/hospital/restore-password** con el método POST, es para que el usuario hospital pueda enviar el dato de su email y así pueda recuperar su contraseña. Antes de que la petición llegue al controlador se valida el único dato del json, que en este caso es la email. 

  Se prueba este endpoint con Postman con los siguientes casos de prueba:

  - Enviando un json con un email válido para que el usuario hospital recupere su contraseña:
    ```json
    {
        "email": "micah11@ethereal.email"
    }
    ```

    Se tiene el siguiente resultado:
    ```json
    {
        "success": true,
        "msg": "Token para recuperación de contraseña generado con éxito"
    }
    ```
  <br>

  - Enviando un json con un email que no existe en el sistema:
    ```json
    {
        "email": "hospitaldelaesperanza@ethereal.email"
    }
    ```

    Se tiene el siguiente resultado:
    ```json
    {
        "success": false,
        "msg": "Error al intentar generar el token de recuperación de contraseña del hospital: El usuario NO existe"
    }
    ```
  <br>

- El endpoint ***http://localhost:4000/api/v1/hospital/submit-restore-password/:token*** con el método PUT, es para que el usuario hospital pueda enviar el dato de su nueva contraseña de recuperación. Antes de que la petición llegue al controlador se valida el único dato del json, que en este caso es la contraseña. 

  Se prueba este endpoint con Postman con los siguientes casos de prueba:

  - Con una url que contiene el token que fue enviado al correo y que no ha expirado ***http://localhost:4000/api/v1/hospital/submit-restore-password/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoibWljYWgxMUBldGhlcmVhbC5lbWFpbCIsInV1aWRDb2RlIjoiYjgwMWJmYjgtNjkxYS00MWIzLTkyNzYtODNmOGZmZTA3NDNmIn0sImlhdCI6MTY3OTExMzIxNSwiZXhwIjoxNjc5MTE2ODE1fQ.7Gcuik1vGAa6t0NPzFrQ2wFHHrMwSXZa39cGMqxjrEU*** y un json con datos válidos para la recuperación de contraseña del hospital:
    ```json
    {
        "newPassword": "Micah##2023"
    }
    ```

    Se tiene el siguiente resultado:
    ```json
    {
        "success": true,
        "msg": "Contraseña del hospital recuperada con éxito"
    }
    ```
  <br>

  - Con una url con un token incorrecto ***http://localhost:4000/api/v1/hospital/submit-restore-password/eyJh*** y un json con los datos para la recuperación de contraseña del hospital:
    ```json
    {
        "newPassword": "Micah##2023"
    }
    ```

    Se tiene el siguiente resultado:
    ```json
    {
        "success": false,
        "msg": "Error al intentar recuperar la contraseña del hospital: jwt malformed"
    }
    ```
<br>


### Médico

- El endpoint ***http://localhost:4000/api/v1/doctor/signup*** con el método POST, que se usa para que el médico pueda registrarse en la aplicación. Antes de que la petición llegue al controlador se validan todos los datos del json.

  Se prueba este endpoint con Postman con los siguientes casos de prueba:

    - Enviando un json con datos válidos para el registro del médico:
      ```json
      {
          "identification": "1451603598",
          "email": "sebastian.rau@ethereal.email",
          "phone": "3259435152",
          "password": "Sebastian#1119",
          "name": "Sebastian",
          "lastName": "Rau",
          "secondLastName": "Romero",
          "address": "Cll 5 # 26-94",
          "speciality": "Médicina General",
          "hospitalId": 2
      }
      ```

      Se tiene el siguiente resultado:
      ```json
      {
          "success": true,
          "msg": "Médico registrado con éxito"
      }
      ```

    <br>

    -  Enviando un json con una identificación que ya está registrada en el sistema:
        ```json
        {
          "identification": "1451603598",
          "email": "andres.rau@ethereal.email",
          "phone": "3435259152",
          "password": "Andres#2894",
          "name": "Andrés",
          "lastName": "Rodríguez",
          "secondLastName": "Castañeda",
          "address": "Cll 42 # 26-94",
          "speciality": "Cardiología",
          "hospitalId": 2
        }
        ```

        Se tiene el siguiente resultado:
        ```json
        {
            "success": false,
            "msg": "Error al registrar el médico: Ya existe un usuario asociado a esta identificación"
        }
        ```

    <br>

    -  Enviando un json con un correo que ya está registrado en el sistema:
        ```json
        {
            "identification": "1035451698",
            "email": "sebastian.rau@ethereal.email",
            "phone": "3435259152",
            "password": "Sebastian#2894",
            "name": "Sebastian",
            "lastName": "Rodríguez",
            "secondLastName": "Castañeda",
            "address": "Cll 42 # 26-94",
            "speciality": "Cardiología",
            "hospitalId": 2
        }
        ```

        Se tiene el siguiente resultado:
        ```json
        {
            "success": false,
            "msg": "Error al registrar el médico: Ya existe un usuario asociado a este email"
        }
        ```

    -  Enviando un json con un nombre que ya está registrado en el sistema:
        ```json
        {
            "identification": "1035451698",
            "email": "sebastian.15@ethereal.email",
            "phone": "3435259152",
            "password": "Sebastian#2894",
            "name": "Sebastian",
            "lastName": "Rau",
            "secondLastName": "Romero",
            "address": "Cll 42 # 26-94",
            "speciality": "Cardiología",
            "hospitalId": 2
        }
        ```

        Se tiene el siguiente resultado:
        ```json
        {
            "success": false,
            "msg": "Error al registrar el médico: Ya existe un médico asociado con el mismo nombre, primer y segundo apellido"
        }
        ```

- El endpoint ***http://localhost:4000/api/v1/doctor/confirm/:token*** con el método GET, para que el médico pueda confirmar el token de registro.

  Se prueba este endpoint con Postman con los siguientes casos de prueba:

    - Con una url que contiene el token que fue enviado al correo y que no ha expirado ***http://localhost:4000/api/v1/doctor/confirm/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoic2ViYXN0aWFuLnJhdUBldGhlcmVhbC5lbWFpbCIsInV1aWRDb2RlIjoiYzYwMWY5NTgtMjE2Ni00ZDVhLWE0MTEtZGUyN2VjNTQ0NjNjIn0sImlhdCI6MTY3OTExNTQ5MSwiZXhwIjoxNjc5MTE5MDkxfQ.4v9vq8GFoEgbkuDXHnsT-jfY8C5SGB7QIRGzXfzCBBk***, se tiene el siguiente resultado:
      ```json
      {
          "success": true,
          "msg": "Confirmación exitosa del médico"
      }
      ```
      <br>

    - Con una url con un token incorrecto ***http://localhost:4000/api/v1/doctor/confirm/eyJh***, se tiene el siguiente resultado:
      ```json
      {
          "success": false,
          "msg": "Error al confirmar el médico: jwt malformed"
      }
      ```
    <br>

- El endpoint ***http://localhost:4000/api/v1/doctor/signin*** con el método POST, que se usa para que el médico pueda iniciar sesión en la aplicación. Es importante mencionar que primero debe confirmar el registro para que le sea permitido el ingreso al sistema y si inicia sesión por primera vez se le enviará el mensaje para que pueda ser redireccionado a una página y efectuar el cambio de contraseña, de lo contrario no le será permitido el ingreso. Antes de que la petición llegue al controlador se validan todos los datos del json, que en este caso son la identificación y la contraseña.

  Se prueba este endpoint con Postman con los siguientes casos de prueba:

    - Con el registro confirmado y la contraseña cambiada correctamente en el primer inicio de sesión, se envía un json con datos válidos para un nuevo inicio de sesión del médico:
      ```json
      {
          "identification": "1451603598",
          "password": "Sebastian$5345"
      }
      ```

      Se tiene el siguiente resultado:
      ```json
      {
          "success": true,
          "msg": "Login exitoso",
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiMyIsImlkZW50aWZpY2F0aW9uIjoiMTQ1MTYwMzU5OCIsImVtYWlsIjoic2ViYXN0aWFuLnJhdUBldGhlcmVhbC5lbWFpbCIsInBob25lIjoiMzI1OTQzNTE1MiIsIm5hbWUiOiJTZWJhc3RpYW4iLCJsYXN0TmFtZSI6IlJhdSIsInNlY29uZExhc3ROYW1lIjoiUm9tZXJvIiwiYWRkcmVzcyI6IkNsbCA1ICMgMjYtOTQifSwiaWF0IjoxNjc5MTE5OTM4LCJleHAiOjE2NzkxMjM1Mzh9.T6bw_TtitRYEPygAYdojjtUNcd37Q6AYFOdbeerXKXw"
      }
      ```
      <br>

    - Enviando un json con una identificación que no existe en el sistema:
      ```json
      {
          "identification": "1951603598",
          "password": "Sebastian#1119"
      }
      ```

      Se tiene el siguiente resultado:
      ```json
      {
          "success": false,
          "msg": "Error de inicio de sesión del médico: No se encontró ningún usuario con esta identificación"
      }
      ```

    <br>

    - Enviando un json con una contraseña incorrecta:
      ```json
      {
          "identification": "1451603598",
          "password": "Sebastian#2023"
      }
      ```

      Se tiene el siguiente resultado:
      ```json
      {
          "success": false,
          "msg": "Error de inicio de sesión del médico: Contraseña incorrecta"
      }
      ```
    <br>

    - Enviando un json con datos válidos, pero NO se ha confirmado el registro:
      ```json
      {
          "identification": "1451603598",
          "password": "Sebastian#1119"
      }
      ```

      Se tiene el siguiente resultado:
      ```json
      {
          "success": false,
          "msg": "Error de inicio de sesión del médico: El usuario debe confirmar su registro"
      }
      ```
    <br>

    - Enviando un json con datos válidos, pero es el primer inicio de sesión o no se ha cambiado la contraseña:
      ```json
      {
          "identification": "1451603598",
          "password": "Sebastian#1119"
      }
      ```

      Se tiene el siguiente resultado:
      ```json
      {
          "success": true,
          "msg": "Redirigir para cambio de contraseña"
      }
      ```
    <br>

- El endpoint ***http://localhost:4000/api/v1/doctor/change-password/:id*** con el método PUT, es para que el médico pueda cambiar su contraseña. Antes de que la petición llegue al controlador se validan todos los datos del json, que en este caso son la contraseña actual y la nueva contraseña. 

  Se prueba este endpoint con Postman con los siguientes casos de prueba:

  - Con una url donde el id es el correspondiente al médico que está enviando la petición ***http://localhost:4000/api/v1/doctor/change-password/1*** y un json con datos válidos para el cambio de contraseña del médico:
    ```json
    {
        "password": "Sebastian$5345",
        "newPassword": "Sebastian##4756"
    }
    ```

    Se tiene el siguiente resultado:
    ```json
    {
        "success": true,
        "msg": "Contraseña del médico actualizada con éxito"
    }
    ```

  <br>

  - Con una url donde el id NO existe o NO es el correspondiente al médico que está enviando la petición ***http://localhost:4000/api/v1/doctor/change-password/25*** y un json con datos para el cambio de contraseña del médico:
    ```json
    {
        "password": "Sebastian$5345",
        "newPassword": "Sebastian##4756"
    }
    ```

    Se tiene el siguiente resultado:
    ```json
    {
        "success": false,
        "msg": "Error al cambiar la contraseña del médico: El médico NO existe"
    }
    ```

  <br>

  - Con una url donde el id es el correspondiente al médico que está enviando la petición ***http://localhost:4000/api/v1/doctor/change-password/1*** y un json que contiene la contraseña actual incorrecta:
    ```json
    {
        "password": "Sebastian$45",
        "newPassword": "Sebastian##5647"
    }
    ```

    Se tiene el siguiente resultado:
    ```json
    {
        "success": false,
        "msg": "Error al cambiar la contraseña del médico: Contraseña incorrecta"
    }
    ```

  <br>

  - Con una url donde el id es el correspondiente al médico que está enviando la petición ***http://localhost:4000/api/v1/doctor/change-password/1*** y un json que contiene la nueva contraseña igual a la contraseña actual:
    ```json
    {
        "password": "Sebastian$5345",
        "newPassword": "Sebastian$5345"
    }
    ```

    Se tiene el siguiente resultado:
    ```json
    {
        "success": false,
        "msg": "Error al cambiar la contraseña del médico: La nueva contraseña no puede ser igual a la anterior"
    }
    ```
  <br>

- El endpoint ***http://localhost:4000/api/v1/doctor/restore-password*** con el método POST, es para que el médico pueda enviar el dato de su email y así pueda recuperar su contraseña. Antes de que la petición llegue al controlador se valida el único dato del json, que en este caso es la email. 

  Se prueba este endpoint con Postman, con los siguientes casos de prueba:

  - Enviando un json con un email válido para que el médico recupere su contraseña:
    ```json
    {
        "email": "sebastian.rau@ethereal.email"
    }
    ```

    Se tiene el siguiente resultado:
    ```json
    {
        "success": true,
        "msg": "Token para recuperación de contraseña generado con éxito"
    }
    ```
  <br>

  - Enviando un json con un email que no existe en el sistema:
    ```json
    {
        "email": "sebastian.42@ethereal.email"
    }
    ```

    Se tiene el siguiente resultado:
    ```json
    {
        "success": false,
        "msg": "Error al intentar generar el token de recuperación de contraseña del médico: El usuario NO existe"
    }
    ```
  <br>

- El endpoint ***http://localhost:4000/api/v1/doctor/submit-restore-password/:token*** con el método PUT, es para que el médico pueda enviar el dato de su nueva contraseña de recuperación. Antes de que la petición llegue al controlador se valida el único dato del json, que en este caso es la contraseña. 

  Se prueba este endpoint con Postman con los siguientes casos de prueba:

  - Con una url que contiene el token que fue enviado al correo y que no ha expirado ***http://localhost:4000/api/v1/doctor/submit-restore-password/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoic2ViYXN0aWFuLnJhdUBldGhlcmVhbC5lbWFpbCIsInV1aWRDb2RlIjoiYzYwMWY5NTgtMjE2Ni00ZDVhLWE0MTEtZGUyN2VjNTQ0NjNjIn0sImlhdCI6MTY3OTEyMTMyNCwiZXhwIjoxNjc5MTI0OTI0fQ.yaH34MuJ_wlyMDXcgVKIz0Gqew97-qUZ188mgV_bghs*** y un json con datos válidos para la recuperación de contraseña del médico:
    ```json
    {
        "newPassword": "Sebastian##2023"
    }
    ```

    Se tiene el siguiente resultado:
    ```json
    {
        "success": true,
        "msg": "Contraseña del médico recuperada con éxito"
    }
    ```
  <br>

  - Con una url con un token incorrecto ***http://localhost:4000/api/v1/doctor/submit-restore-password/eyJh*** y un json con los datos para la recuperación de contraseña del médico:
    ```json
    {
        "newPassword": "Sebastian##2023"
    }
    ```

    Se tiene el siguiente resultado:
    ```json
    {
        "success": false,
        "msg": "Error al intentar recuperar la contraseña del médico: jwt malformed"
    }
    ```
<br>


### Observaciones Médicas

- El endpoint ***http://localhost:4000/api/v1/medical-observations/create-observation*** con el método POST, para que el médico pueda crear una observación médica de un paciente. Antes de que la petición llegue al controlador se validan todos los datos del json.

  Se prueba este endpoint con Postman con los siguientes casos de prueba:

    - Enviando un json con datos válidos para crear la observación médica del paciente:
      ```json
      {
          "patientId": 1,
          "hospitalId": 2,
          "doctorId": 1,
          "observationDate": "2023-01-12T12:30:45",
          "observationDetail": "El paciente presenta fiebre alta, dolor de garganta y tos seca. Después de realizar una evaluación médica, se ha diagnosticado una posible infección viral. Se remite al paciente al departamento de Pediatría para una evaluación más detallada y seguimiento del tratamiento." 
      }
      ```

      Se tiene el siguiente resultado:
      ```json
      {
          "success": true,
          "msg": "Observación médica creada con éxito"
      }
      ```

    <br>

    - Enviando un json con un id de paciente que NO existe:
      ```json
      {
          "patientId": 25,
          "hospitalId": 2,
          "doctorId": 1,
          "observationDate": "2023-01-12T12:30:45",
          "observationDetail": "El paciente presenta fiebre alta, dolor de garganta y tos seca. Después de realizar una evaluación médica, se ha diagnosticado una posible infección viral. Se remite al paciente al departamento de Pediatría para una evaluación más detallada y seguimiento del tratamiento." 
      }
      ```

      Se tiene el siguiente resultado:
      ```json
      {
          "success": false,
          "msg": "Error al crear la observación médica: El paciente NO existe"
      }
      ```

    <br>

    - Enviando un json con un id de hospital que NO existe:
      ```json
      {
          "patientId": 1,
          "hospitalId": 25,
          "doctorId": 1,
          "observationDate": "2023-01-12T12:30:45",
          "observationDetail": "El paciente presenta fiebre alta, dolor de garganta y tos seca. Después de realizar una evaluación médica, se ha diagnosticado una posible infección viral. Se remite al paciente al departamento de Pediatría para una evaluación más detallada y seguimiento del tratamiento." 
      }
      ```

      Se tiene el siguiente resultado:
      ```json
      {
          "success": false,
          "msg": "Error al crear la observación médica: El hospital NO existe"
      }
      ```

    - Enviando un json con un id de médico que NO existe:
      ```json
      {
          "patientId": 1,
          "hospitalId": 2,
          "doctorId": 25,
          "observationDate": "2023-01-12T12:30:45",
          "observationDetail": "El paciente presenta fiebre alta, dolor de garganta y tos seca. Después de realizar una evaluación médica, se ha diagnosticado una posible infección viral. Se remite al paciente al departamento de Pediatría para una evaluación más detallada y seguimiento del tratamiento." 
      }
      ```

      Se tiene el siguiente resultado:
      ```json
      {
          "success": false,
          "msg": "Error al crear la observación médica: El médico NO existe"
      }
      ```
      
    <br>
    
- El endpoint ***http://localhost:4000/api/v1/medical-observations/patient/:id*** con el método GET, para que el usuario paciente pueda consultar todas sus observaciones médicas.

  Se prueba este endpoint con Postman con los siguientes casos de prueba:

    - Con una url donde el id es el correspondiente al paciente que está enviando la petición ***http://localhost:4000/api/v1/medical-observations/patient/1***, se tiene el siguiente resultado:
      ```json
      [
          {
              "patientName": "David",
              "patientLastName": "Gulgowski",
              "patientSecondLastName": "Romaguera",
              "patientBirthdate": "1996-11-19",
              "userIdentification": "1160354598",
              "userEmail": "david.gulgowski@ethereal.email",
              "userPhone": "3594351526",
              "hospitalName": "Hospital Micah",
              "doctorId": "1",
              "doctorName": "Sebastian",
              "doctorLastName": "Rau",
              "doctorSecondLastName": "Romero",
              "doctorSpeciality": "Médicina General",
              "observationId": "1",
              "observationDate": "2023-01-12T12:30:45.000Z",
              "observationDetail": "El paciente presenta fiebre alta, dolor de garganta y tos seca. Después de realizar una evaluación médica, se ha diagnosticado una posible infección viral. Se remite al paciente al departamento de Pediatría para una evaluación más detallada y seguimiento del tratamiento."
          }
      ]
      ```
      <br>

    - Con una url donde el id del paciente NO existe  ***http://localhost:4000/api/v1/medical-observations/patient/25***, se tiene el siguiente resultado:
      ```json
      []
      ```
    <br>

- El endpoint ***http://localhost:4000/api/v1/medical-observations/hospital/:id*** con el método GET, para que el usuario hospital pueda consultar todas las observaciones médicas generadas por los médicos asociados a ese hospital.

  Se prueba este endpoint con Postman con los siguientes casos de prueba:

    - Con una url donde el id es el correspondiente al hospital que está enviando la petición ***http://localhost:4000/api/v1/medical-observations/hospital/2***, se tiene el siguiente resultado:
      ```json
      [
          {
              "patientName": "David",
              "patientLastName": "Gulgowski",
              "patientSecondLastName": "Romaguera",
              "patientBirthdate": "1996-11-19",
              "userIdentification": "1160354598",
              "userEmail": "david.gulgowski@ethereal.email",
              "userPhone": "3594351526",
              "hospitalName": "Hospital Micah",
              "doctorId": "1",
              "doctorName": "Sebastian",
              "doctorLastName": "Rau",
              "doctorSecondLastName": "Romero",
              "doctorSpeciality": "Médicina General",
              "observationId": "1",
              "observationDate": "2023-01-12T17:30:45.000Z",
              "observationDetail": "El paciente presenta fiebre alta, dolor de garganta y tos seca. Después de realizar una evaluación médica, se ha diagnosticado una posible infección viral. Se remite al paciente al departamento de Pediatría para una evaluación más detallada y seguimiento del tratamiento."
          }
      ]
      ```
      <br>

    - Con una url donde el id del hospital NO existe  ***http://localhost:4000/api/v1/medical-observations/hospital/25***, se tiene el siguiente resultado:
      ```json
      []
      ```
    <br>

- El endpoint ***http://localhost:4000/api/v1/medical-observations/doctor/:id*** con el método GET, para que el médico pueda consultar todas las observaciones médicas generadas por él.

  Se prueba este endpoint con Postman con los siguientes casos de prueba:

    - Con una url donde el id es el correspondiente al médico que está enviando la petición ***http://localhost:4000/api/v1/medical-observations/doctor/1***, se tiene el siguiente resultado:
      ```json
      [
          {
              "patientName": "David",
              "patientLastName": "Gulgowski",
              "patientSecondLastName": "Romaguera",
              "patientBirthdate": "1996-11-19",
              "userIdentification": "1160354598",
              "userEmail": "david.gulgowski@ethereal.email",
              "userPhone": "3594351526",
              "hospitalName": "Hospital Micah",
              "doctorId": "1",
              "doctorName": "Sebastian",
              "doctorLastName": "Rau",
              "doctorSecondLastName": "Romero",
              "doctorSpeciality": "Médicina General",
              "observationId": "1",
              "observationDate": "2023-01-12T17:30:45.000Z",
              "observationDetail": "El paciente presenta fiebre alta, dolor de garganta y tos seca. Después de realizar una evaluación médica, se ha diagnosticado una posible infección viral. Se remite al paciente al departamento de Pediatría para una evaluación más detallada y seguimiento del tratamiento."
          }
      ]
      ```
      <br>

    - Con una url donde el id del médico NO existe  ***http://localhost:4000/api/v1/medical-observations/doctor/25***, se tiene el siguiente resultado:
      ```json
      []
      ```
    <br>

- El endpoint ***http://localhost:4000/api/v1/medical-observations/download/patient/:id*** con el método GET, para que el usuario paciente pueda descargar en un archivo pdf todas sus observaciones médicas.

  Se prueba este endpoint con Postman con los siguientes casos de prueba:

    - Con una url donde el id es el correspondiente al paciente que está enviando la petición ***http://localhost:4000/api/v1/medical-observations/download/patient/1***, se tiene el siguiente resultado:
      
      Muestra Status: 200 OK y genera el pdf que se llama "ObservacionesMedicas_DavidGulgowski.pdf", el cual se ha adjuntado en la ruta ***pdf\ObservacionesMedicas_DavidGulgowski.pdf***.

    - Con una url donde el id del paciente NO existe ***http://localhost:4000/api/v1/medical-observations/download/patient/25***, se tiene el siguiente resultado:
      ```json
      {
          "success": false,
          "msg": "Error al descargar las observaciones médicas del paciente: Ha ocurrido una falla y no se ha podido completar la descarga"
      }
      ```