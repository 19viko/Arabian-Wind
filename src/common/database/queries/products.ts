import { CreateProductDto } from "../../../resources/products/dto/create-product.dto";
import { UpdateProductDto } from "../../../resources/products/dto/update-product.dto";
import {CreateProductNoteDto} from "../../../resources/products/dto/create-product-note.dto";

export function createProductQuery(createProductDto: CreateProductDto, images): string {
  const { category_id, name, description, price } = createProductDto;
  return `SELECT * FROM create_product(${category_id},'${name}','${JSON.stringify(images)}','${description}','${price}')`;
}

export function getAllProductQuery(limit: number, offset: number, category: number): string {
  return `SELECT * FROM get_all_products(${limit}, ${offset}, ${category})`;
}

export function getAllProducts(limit: number, offset: number): string {
  return `SELECT * FROM get_all_products_query(${limit}, ${offset})`;
}

export function getProductCategories(): string {
  console.log(`SELECT * FROM get_product_categories()`)
  return `SELECT * FROM get_product_categories()`;
}

export function getProductById(id: string): string {
  return `SELECT * FROM get_product_by_Id('${id}')`;
}

export function updateProductById(product_id: string, updateProductDto: UpdateProductDto, images): string | any {
  const { category_id, name, description, price } = updateProductDto;
  return `SELECT * FROM update_product_by_id('${product_id}',${category_id},'${name}','${JSON.stringify(images)}','${description}','${price}')`;
}

export function deleteProductById(id: string): string {
  return `SELECT * FROM delete_product_by_id('${id}')`;
}

export function getProductsByName(product_name: string): string {
  return `SELECT * FROM get_all_product_by_name('%${product_name}%')`;
}

export function createProductNote(body: CreateProductNoteDto, images): string{
  const { product_id, category_name, name } = body
  return `SELECT * FROM create_product_note_query('${product_id}', '${category_name}', '${name}', '${JSON.stringify(images)}')`
}

export function getProductNotes(product_id: string, category_name: string): string {
  return `SELECT * FROM get_product_notes_query('${product_id}', '${category_name}')`
}
