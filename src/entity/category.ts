import {Entity, PrimaryGeneratedColumn, Column, OneToMany,BaseEntity} from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import {Recipes} from "./Recipe";

@ObjectType()
@Entity()
export class Category extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    name!: string;

    //Puede tener varias recetas asociadas a la categoría
    @Field(() => String)
    @OneToMany(type => Recipes, recipe => recipe.categoria)
    recipes!: Recipes[];

}