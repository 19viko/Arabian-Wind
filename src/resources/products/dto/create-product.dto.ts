import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
  @IsString()
  category_id: string;

  @IsString()
  name: string;

  @IsOptional()
  images: object;

  @IsString()
  description: string;

  @IsString()
  price: string;
}
