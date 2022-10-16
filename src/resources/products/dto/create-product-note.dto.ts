import {IsOptional, IsString} from "class-validator";

export class CreateProductNoteDto {
    @IsString()
    product_id: string

    @IsString()
    category_name: string

    @IsString()
    name: string

    @IsOptional()
    images?: string
}