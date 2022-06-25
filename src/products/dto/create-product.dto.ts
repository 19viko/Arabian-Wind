import { IsNumber, IsString } from "class-validator";

export class CreateProductDto {
  @IsNumber()
  category_id: number;

  @IsString()
  name: string;

  @IsString()
  img: string;

  @IsString()
  description: string;

  @IsString()
  price: string;
}
