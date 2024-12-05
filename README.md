# Gestor de idiomas: Colegio de idiomas

## ¿Qué es?

El 'Colegio de idiomas' es un proyecto que resolvera las necesidades de los profesores y alumnos a la hora de conocer los datos relevantes de cada asignatura:.

## ¿Que ofrece esta aplicación?
- Gestion de usuarios por roles
- Gestión de clases por roles
- Asignación de clases global
- Gestión de horarios por roles

## ¿Como se usa?

La aplicación esta diseñada para ser usada con Node.js y MongoDB.
Pasos:
- Descargar o clonar el repositorio
- Instalar paquetes con el comando 'npm i' tanto en la carpeta raíz como en su subcarpetas 'backend' y 'frontend'
- Regresar a la carpeta raíz y ejecutar el comando 'npm run dev'
- Tras unos segundos podras iniciar la app web en la url que le corresponda

## ¿Como esta diseñada la App?

La app esta relacionada por id entre varios documentos gracias a la api puesto que utiliza una base de datos no relacional como MongoDB:

[insertar imagen de la db]

La api cuenta con varios metodos de tipo CRUD y más específicos como obtener el rol de una persona o identificar que horarios serán los proximos de cada clase.

### Login

El sistema de registro dispone de 2 formularios diferentes que cambian dependiendo si el usuario quiere registrarse o iniciar sesión.

Depende su decision se hara un fetch diferente con sus respectivas comprobaciones:
- Registro:
  - Fetch: '/register'
  - Comprobacion de que en el body se haya pasado correctamente
  - Comprobacion de que el email no está repetido
  - Creación de nuevo usuario con los datos introducidos

- Inicio de sesión:
  - Fetch: '/login'
  - Comprobacion de que en el body se haya pasado correctamente
  - Comprobacion de que existe un usuario con ese email
  - Comprobación de que la contraseña es correcta
  - Generación y envio de token

    
