# MediLogPortal

## ¿Qué es MediLogPortal?
Es un desarrollo backend de servicio web (API REST) que cuenta con unos endpoints para un sistema de gestión de historia clínica centralizada. 

Esta API cuenta con los siguientes servicios:
- Pacientes: un paciente podrá registrarse, confirmar su registro, iniciar sesión, cambiar y recuperar la contraseña.
- Hospital: Igual que paciente, podrá registrarse, confirmar su registro, iniciar sesión, cambiar y recuperar la contraseña.
- Médico: El hospital será el encargado de registrar al médico, luego éste deberá confirmar su registro y al iniciar sesión por primera vez deberá cambiar la contraseña. Además, también dispondrá de la opción de cambiar la contraseña y recuperar la misma.
- Observaciones Médicas: El paciente podrá consultar todas sus observaciones médicas y descargar un archivo que contiene todas estas. El hospital de igual forma, podrá consultar todos los registros realizados por su médicos. Y el médico no sólo podrá crear una observación médica sino que también consultar sus registros realizados por él mismo. 

---
## Requerimientos
- Node.js (Recomendada: vs 16.18.0)
- Express (Se instala en las dependencias)
- Postgresql (Recomendada: vs 15.2)

## Instalación
- Abrir la consola de comandos y:
  - Clonar el repositorio con el comando ***git clone https://github.com/ndcruzc89/MediLogPortal.git***
  - Navegar hasta la carpeta raíz del proyecto (***MediLogPortal***)
  - Ejecutar el comando ***npm install*** para instalar las dependencias necesarias. 
- Se debe crear un archivo ***.env*** en la raíz del proyecto e incluir los siguientes párametros de conexión a la base de datos y el correo que va a enviar los mensajes a los destinatarios:

  ```
  PORT=4000
  DB_USER='escribir el nombre de usuario de la db, por lo general es postgres'
  DB_PASSWORD='escribir la contraseña de la db'
  DB_HOST='localhost'
  DB_NAME='medilogportal'
  DB_PORT='5432'
  EMAIL='escribir el nombre de email de cuenta gmail'
  PASS='escribir la contraseña de aplicaciones generada por el correo de gmail, por lo general es de 16 digitos'
  ```

<br>

- Abrir Postgresql y crear la base de datos con el nombre ***medilogportal***.
- Si no se desea crear la base de datos, se puede importar en Postgresql el archivo ***medilogportal.sql*** que se encuentra en la ruta ***src\database***, el cual es la base de datos usada en este proyecto; pero hay que tener en cuenta que ha sido exportado desde Postgresql 15.2.

---
## Cómo ejecutar la API:
- Por medio de la consola de comandos y ubicado en la carpeta raíz del proyecto (***MediLogPortal***):
- Ejecutar el comando ***npm run dev*** si se quiere ejecutar el proyecto en modo de desarrollo.
- Ejecutar el comando ***npm run prod*** si se quiere ejecutar el proyecto en modo de producción. 

---
## Estructura de la API
La estructura de carpetas y rutas de la API puede consultar el apartado ***docs\estructura\estructura_doc.md***

---
## Desarrollo de la API
### Backend (API):
La documentación relacionada con el desarrollo del backend se encuentra en la ruta ***docs\desarrollo\backend_doc\backend_doc.md***

### Base de datos
La documentación relacionada con el desarrollo de la base de datos se encuentra en la ruta ***docs\desarrollo\database_doc\database_doc.md***

---
## Autor 
Nelson Daniel Cruz Camelo
