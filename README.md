# my-online-course-platform
my-online-course-platform

Resumen Técnico de Proyecto con Backend CodeIgniter
El proyecto implica desarrollar un sistema de gestión de cursos con un frontend en React.js y un backend en CodeIgniter. Aquí está el resumen técnico detallado:

Frontend (React.js)
Tecnologías Utilizadas:

React.js:
Biblioteca de JavaScript para construir interfaces de usuario interactivas.
Utiliza componentes reutilizables y un enfoque basado en el estado para actualizar dinámicamente la interfaz de usuario.

Material-UI / Bootstrap:
Biblioteca de componentes de React basada en Material Design de Google y Bootstrap.
Proporciona una interfaz de usuario estilizada y predefinida que facilita la creación de aplicaciones modernas.

Axios:
Librería para realizar peticiones HTTP desde el cliente React al servidor backend.
Se utiliza para obtener y enviar datos entre el frontend y el backend.

React Router:
Biblioteca para manejar las rutas y la navegación dentro de la aplicación React.
Permite definir diferentes vistas basadas en la URL actual.

Hooks (useState, useEffect):
Se utilizan hooks de React para manejar el estado local del componente y efectos secundarios.
useState para definir y actualizar el estado de los componentes.
useEffect para realizar efectos secundarios después de renderizar el componente.

Funcionalidades Implementadas:

Autenticación:
Implementación de formularios de login y register.
Validación de credenciales en el frontend antes de enviar al backend.

Mantenedor de Cursos:
Visualización de cursos disponibles con detalles como título, descripción y estado.
Creación de nuevos cursos utilizando formularios controlados en React.
Edición y actualización de cursos existentes.
Eliminación de cursos desde el frontend, con llamadas a API correspondientes.

Interfaz de Usuario:
Diseño responsivo utilizando componentes de Material-UI para asegurar una experiencia de usuario coherente y atractiva en diferentes dispositivos.

Backend (CodeIgniter)
Tecnologías y Características:

CodeIgniter:
Framework de desarrollo rápido y ligero para PHP.
Estructura MVC (Modelo-Vista-Controlador) que facilita la separación de lógica de negocio y presentación.

API RESTful:
Implementación de endpoints RESTful para manejar las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) de cursos y usuarios.
Utilización de métodos HTTP estándar (GET, POST, PUT, DELETE) para comunicarse con el frontend.

ORM (Object-Relational Mapping):
Uso de ORM integrado en CodeIgniter o librerías adicionales para facilitar el acceso y la manipulación de datos en la base de datos.
Mapeo de objetos a tablas de base de datos y viceversa para una gestión más eficiente de datos.

Seguridad y Validación:
Validación de datos en el backend para prevenir inyecciones de SQL y asegurar la integridad de los datos.
Implementación de medidas de seguridad para proteger la aplicación contra amenazas como XSS (Cross-Site Scripting) y CSRF (Cross-Site Request Forgery).

Base de Datos:
Integración con un sistema de gestión de bases de datos relacional (MySQL) para almacenar y gestionar la información de usuarios y cursos.

Conclusiones:
Este proyecto combina tecnologías frontend y backend para ofrecer una plataforma completa de gestión de cursos. La elección de React.js para el frontend y CodeIgniter para el backend proporciona un equilibrio entre eficiencia en el desarrollo y rendimiento de la aplicación. Es crucial diseñar una arquitectura sólida y utilizar prácticas de desarrollo seguro para garantizar la escalabilidad y la seguridad del sistema.

____________________________

Instalacion

1. Ejecutar sqldump. Base de datos se llama mycursos
2. Verificar user y pass de la base de datos: estos deben ir en back/app/config/Database.php
3. En la carpeta front, ejecutar npm run build
4. Crear virtual host, asociandolo a la carpeta front/build
5. Copiar carpeta back en recien creada carpeta build en front/


Ejemplos

<VirtualHost *:80> 
    DocumentRoot "C:/laragon/www/my-online-course-platform/front/build/"
    ServerName my-online-course-platform.test
    ServerAlias *.my-online-course-platform.test
    <Directory "C:/laragon/www/my-online-course-platform/front/build/">
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>

Esquema de trabajo

    ---back---app---Config
                 ---Controller
                                ---Api/V1
    ---front---build
            ---src  ---components
                    ---css
    ---sql
    ---postman

