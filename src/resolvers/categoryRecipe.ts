import { Query, Resolver, Mutation, Arg, Field, InputType, Int,Ctx,ID,UseMiddleware} from 'type-graphql'
//Importar el modelo de datos de typeOMR, importar la entidad, para hacer el CRUD a a base de datos
import { Category } from '../entity/category';
import { isAuthenticated } from "./Middleware/index";


@InputType()
class Categoryinput {
    @Field()
    name!: string
}

@Resolver()
export class categoryResolver{

  //Consultar todas las Categorias
  @Query(() => [Category])
  getcategory() {
    //Hace una consulta a mysql y retorna un arreglo con los datos
    return Category.find();
  }
  //Consultar una Category
  @Query(() => Category)
  async getOneCategory(@Arg("id", () => Int) id: number) {
    return await Category.findOne(id);
  }
  //Crear Category
  @Mutation(() => Category)
  async addRCategory(@Arg("variables") categoryinput: Categoryinput):
    Promise<Category> {
    const  Categorynew =await Category.create(categoryinput).save();
    return Categorynew;
  }
  //Actualizar Category 
  @Mutation(() => Category)
  async updateCategory(
    @Arg("id", () => Int) id: number,
    @Arg("fields", () => Categoryinput) fields: Categoryinput
  ) {
    return await Category.update({ id }, fields);
  }
  //Eliminar Category
  @Mutation(() => Boolean)
  async deleteCategory(@Arg("id", () => Int) id: number) {
      //Type ORM para eliminarlo desde graphql
      await Category.delete(id);
      return true;
  }

}