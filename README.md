# Gestor de idiomas: Colegio de idiomas

## ¿Qué es?

El **'Colegio de idiomas'** es un proyecto que resolverá las necesidades de los profesores y alumnos a la hora de conocer los datos relevantes de cada asignatura.

&nbsp;

![Language Manager](frontend/src/assets/Logo.webp)

## ¿Qué ofrece esta aplicación?

- Gestión de usuarios por roles
- Gestión de clases por roles
- Asignación global de clases
- Gestión de horarios por roles

## ¿Cómo se usa?

La aplicación está diseñada para ser usada con **Node.js** y **MongoDB**.

Pasos para la instalación y uso:

1. Descargar o clonar el repositorio.
2. Instalar los paquetes con el comando `npm i` tanto en la carpeta raíz como en sus subcarpetas **'backend'** y **'frontend'**.
3. Regresar a la carpeta raíz y ejecutar el comando `npm run dev`.
4. Tras unos segundos, podrás iniciar la app web en la URL correspondiente.

## ¿Cómo está diseñada la App?

La app está relacionada por ID entre varios documentos gracias a la API, ya que utiliza una base de datos no relacional como **MongoDB**.

![Base de datos](DiagramaDB.svg)

La API cuenta con varios métodos de tipo CRUD y otros más específicos, como obtener el rol de una persona o identificar cuáles serán los próximos horarios de cada clase.

### Login

El sistema de registro dispone de dos formularios diferentes que cambian dependiendo de si el usuario desea registrarse o iniciar sesión.

Dependiendo de la decisión, se realizará un **fetch** diferente con sus respectivas comprobaciones:

- **Registro**:

  - **Fetch**: `/register`
  - Comprobación de que el body se haya enviado correctamente.
  - Comprobación de que el email no está repetido.
  - Creación de un nuevo usuario con los datos introducidos.

- **Inicio de sesión**:
  - **Fetch**: `/login`
  - Comprobación de que el body se haya enviado correctamente.
  - Comprobación de que existe un usuario con ese email.
  - Comprobación de que la contraseña es correcta.
  - Generación y envío de un token.
