//Crear conexión con base de datos

import {createConnection}  from 'typeorm';

import path from 'path';

//Crear la conexion apartir de unos parametros
export async function connect() {
    await createConnection({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password:'',
        database: "recipesgql",
        //Lista de las tablas
        //__dirname da la ruta desde la unidad c hasta la carpeta en la que se encuntra el archivo
        entities: [
            path.join(__dirname, '../entity/**/**.ts')
        ],
        synchronize:true
    });
    console.log('Database is connected')
}

