import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Connection } from "typeorm";
import { ProductsQuery } from "../common/database/queries";
import { getAllProductQuery } from "../common/database/queries/products";

@Injectable()
export class ProductsService {
  constructor(
    private readonly connection: Connection
  ) {
  }

  async create(createProductDto: CreateProductDto) {
    try {
      await this.connection.query(ProductsQuery.getAllProductsQuery(createProductDto));
      return {
        msg: "You have successfully created a product"
      };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findAll(limit: number, offset: number) {
    try {
      return await this.connection.query(getAllProductQuery(limit, offset));
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
