import { Entity,PrimaryGeneratedColumn,Column,BaseEntity,CreateDateColumn,ManyToOne} from "typeorm";
import { Field, ID, Int, ObjectType  } from "type-graphql";
import {Category} from "./category";
import {Users} from "./users"


  //ObjectType para definir en graphql
  @ObjectType()
  @Entity()
  export class Recipes extends BaseEntity {
    @Field(type => ID)
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Field()
    @Column()
    name!: string;
  
    @Field()
    @Column()
    Description!: string;
  
    @Field(type => String)
    @Column()
    ingredients!: String;

    //Un receta está asociada a un User
    @Field(type => Users)
    @ManyToOne(type => Users, user => user.recipe)
    userReceta!: String;

    @Field(type => Category)
    @ManyToOne(type => Category, cat => cat.recipes)
    categoria!: Category;
  }