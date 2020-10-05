//Metodos que van a permitir crar datos, consultar datos CRUD
import { Query, Resolver, Mutation, Arg, Field, InputType, Int, Ctx, ID } from 'type-graphql'
import { Recipes } from '../entity/Recipe'
import { Category } from '../entity/category';
import { Users } from '../entity/users'
import { Context } from 'vm';
import { strict } from 'assert';
import { stringify } from 'querystring';


@InputType()
class Recipeinput {
  @Field()
  name!: string
  @Field()
  Description!: string
  @Field()
  ingredients!: string;

  
}

//Definir la clase product con las acciones que quiero hacer sobre la clase
@Resolver()
export class RecipeResolver {



  //Consultar todas las recetas
  @Query(() => [Recipes])
  async getrecipes() {
    //Hace una consulta a mysql y retorna un arreglo con los datos
    return Recipes.find();
  }
  //Consultar una receta
  @Query(() => Recipes)
  async getOneRecipe(@Arg("id", () => Int) id: number, @Ctx() ctx: Context) {

    const recipeone= await Recipes.findOne(id);

    return (recipeone);
  }

  /*
  @Query(() => Recipes)
  async getMyRecipe(@Ctx() ctx: Context) {
    let email= String(ctx.email)
    let userlog = await Users.findOne({ where:{email}});
    let userReceta= String(userlog?.id);

    console.log(userReceta);

    Recipes.findByIds
    const recipemy= await Recipes.findByIds({ where:{userReceta}});

    return (recipemy);
  }*/


  //Create Recipe
  @Mutation(() => Recipes)
  async addRecipe(
    @Arg("variables") recipeInput: Recipeinput,
    @Ctx() ctx: Context) :Promise<Recipes | null >{
    //Traer el id 
      let email= String(ctx.email)
  
    console.log("correo", email);
    let userlog = await Users.findOne({ where:{email}});

    let id= String(userlog?.id)
    console.log("userlog", userlog?.id);
    const recipenew = Recipes.create({...recipeInput, userReceta: id}).save();
    return recipenew;
  }
  //Actualizar  
  @Mutation(() => Recipes)
  async upadateRecipe(
    @Arg("id", () => Int) id: number,
    @Arg("fields", () => Recipeinput,) fields: Recipeinput,
    @Ctx() ctx: Context
  ) {
    return await Recipes.update({ id }, fields);
  }
  //Eliminar
  @Mutation(() => Boolean)
  async deleterecipe(
    @Arg("id", () => Int) id: number,
    @Ctx() ctx: Context) {

      
    let email= String(ctx.email);

    console.log(email);

    if(!email){
      return ("falso")
    }

    //Type ORM para eliminarlo desde graphql

    await Recipes.delete(id);
    return true;
  }

}