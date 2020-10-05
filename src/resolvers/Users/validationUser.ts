import { MaxLength, Length, IsEmail,} from "class-validator";
import { Field, Int, ObjectType , ID, Root, Arg,InputType} from "type-graphql";
import { IsEmailAlreadyExist } from "./emailexist";

@InputType()
export class RegisterInput {

    @Field()
    @Length(1,30)
    firstname!:string

    @Field()
    @Length(1,30)
    lastname!:string

    @Field()
    @IsEmail()
    @IsEmailAlreadyExist({message:"email alredy in use"})
    email!:string

    @Field()
    password!:string
 
}