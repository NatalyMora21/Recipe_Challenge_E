//ARCHIVO PARA CONFIGURAR EL SERVIDOR

import express from 'express';
import { ApolloServer } from 'apollo-server-express'

//Convertir de type-graphql a esquema de graphql
import { buildSchema, ArgumentValidationError } from 'type-graphql'
import { categoryResolver } from './resolvers/categoryRecipe'
import { RecipeResolver } from './resolvers/recipeResolver'
import { SingUpResolver } from './resolvers/UserResolver'
import { LoginResolver } from './resolvers/login'

const { verifyUser } = require('./context/context')

import cors from 'cors'

//Crear un servidor
export async function startServer() {
    const app = express();
    app.use(cors());
    app.use(express.json());

    //Express es la forma de iniciar un servidor http y manejar las rutas
    //Express es el servidor completo, apollo server solo se va a encargar de la API DE GRAPHQL(Ruta)
    //schema va a recibir el esquema de graphql(Que es lo que podemos consultar que es lo que podemos crear) que estamos recibiendo
    //Una vez ApolloServer se ejecute va a devolver un servidor y es el que se va a aplicar a express

    const schema =
        await buildSchema({
            resolvers: [RecipeResolver, categoryResolver, SingUpResolver, LoginResolver]
        })
    const server = new ApolloServer({
        schema,
        
        context: async ({ req }) => {
            const reqemail = await verifyUser(req);
            return {
                email: reqemail
            }
        }
    })
    //Apollo va a funcionar dentro del servidor de express
    server.applyMiddleware({ app, path: '/graphql' });

    //Para poder iniciar el servidor se debe exportar el app
    //Devuelve la app con el servidor configurado más no iniciado   
    return app;

}
