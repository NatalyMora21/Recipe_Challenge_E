import {Entity,PrimaryGeneratedColumn,Column,BaseEntity,CreateDateColumn,ManyToOne,OneToMany} from "typeorm";
import {Recipes} from "./Recipe";
import { Field, Int, ObjectType , ID, Root} from "type-graphql";
import { IsEmailAlreadyExist } from "../resolvers/Users/emailexist";

@ObjectType()
@Entity()
export class Users extends BaseEntity  {

    @Field(type => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    firstname!: string;

    @Field()
    @Column()
    lastname!: string;

    @Field()
    @Column()
    @IsEmailAlreadyExist()
    email!: string;

    @Column()
    password!: string;

    //Un usuario  puede tener muchas recetas
    //userReceta es el campo donde almaceno es usuario en la entidad Recipes
     @OneToMany(type => Recipes, recipe => recipe.userReceta)
    recipe!: Recipes[];
}

