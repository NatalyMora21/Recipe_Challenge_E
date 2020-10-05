
import {Resolver,Query,Mutation,Arg,FieldResolver, Root} from "type-graphql";
const bcrypt = require('bcrypt');
import { Users } from '../entity/users'
import{RegisterInput} from './Users/validationUser'


@Resolver(Users)
export class SingUpResolver{

    @Mutation(()=>Users) 
    async register(

        @Arg("inputuser"){email,firstname, lastname, password}:RegisterInput,
        ):Promise<Users>{
            const hashPassWord=await bcrypt.hash(password,12);

            const user=await Users.create({
                firstname,
                email,
                lastname,
                password:hashPassWord
            }).save();
            return user
    }
}