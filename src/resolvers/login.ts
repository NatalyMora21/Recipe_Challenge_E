

import {Resolver,Mutation,Arg, Ctx,Query} from "type-graphql";
import { Context } from "vm";
const bcrypt = require('bcrypt');
import { Users } from '../entity/users';
const jwt= require('jsonwebtoken');

const {combineResolvers}= require('graphql-resolvers')
const {isAuthenticated}= require('./Middleware/index')

@Resolver(Users)
export class LoginResolver{

    @Query(() => String)
    getuser(
        @Arg("email") email:String,
        @Ctx() ctx: Context) {

            if(!ctx.email){
                throw new Error('Acceso denegado')
            }
           console.log("getuser", ctx.email);
       }


    //Login
    @Mutation(() => String, { nullable: true })
    async login(
        @Arg("email") email: String,
        @Arg("password") password: string
        ):Promise<Users | String>{
        //Trae todo los campos del usuarios
        let userl= await Users.findOne({where:{email}});
            if (!userl){
            return "Usuario o contraseña errada"
        }
        let validacion= await bcrypt.compare(password,userl.password);
        if(!validacion){
            return "Usuario o contraseña errada"
        }
        const secret=process.env.JWT_SECRET_KEY;
        const token= jwt.sign({email:email},'gfdgdfgd',{expiresIn:'1d'})
        return token;
    }	

}