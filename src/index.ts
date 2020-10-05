//typegraphql typeORM se basan en un modulo más que se llama Reflect.getMetadata 
import "reflect-metadata"
import {connect} from './config/typeorm'
import {startServer} from './app';
import 'class-validator'

//Se va iniciar apenas se inicie la aplicación
async function main(){
 //Iniciar conexión con la base de datos
 connect();
 //Iniciar el servidor
 const app=await startServer();
 app.listen(3000);
 console.log('Server on Port',3000);
}

main();

console.log('Mi primer typescript');