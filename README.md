# origin-test
Test publico de origin

Instalaciones:
git: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
node: https://nodejs.org/es/download/

Clonar el repositorio de git:
git clone https://github.com/mlupani/origin-test.git

Dirigirse a la carpeta client y ejecutar el comando:
npm i
Para instalar todas las dependencias.

Utilizar el archivo Dump20210722.sql en cualquier servidor con mysql instalado e importar, sino puede usarse localmente instalando MySQL.

Instalar Mysql desde https://dev.mysql.com/downloads/installer/
Seguir todos los pasos de la instalacion
crear un usuario con los datos:

user: root
pass: 1234

importar el archivo de Dump20210722.sql incluido en el repositorio:
-Abrir el programa MySQL WorkBench
-File > Run SQL script y seleccionar el archivo Dump20210722.sql

Ejecutar y seleccionar la nueva DB.

Pasos para levantar la aplicacion:
Dirigirse a la carpeta server y ejecutar el comando 'npm run dev' para iniciar el servidor
Dirigirse a la carpeta client y ejecutar el comando 'npm start' para iniciar la aplicacion

Usuarios de prueba:

user: miguel
pass: miguel

user: jose
pass: jose

las contraseñas estan encriptadas en md5 en la DB
