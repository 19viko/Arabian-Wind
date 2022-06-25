import { CreateProductDto } from "../../../products/dto/create-product.dto";

export function getAllProductsQuery(createProductDto: CreateProductDto): string {
  const { category_id, name, img, description, price } = createProductDto;
  return `SELECT * FROM create_product(${category_id},'${name}','${img}','${description}','${price}')`;
}

export function getAllProductQuery(limit: number, offset: number): string {
  return `SELECT * FROM get_all_product(${limit},${offset})`;
}
