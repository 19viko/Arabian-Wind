import {IsString} from "class-validator";

export class CreateContactUsDto {
    @IsString()
    email: string;

    @IsString()
    name: string;

    @IsString()
    description: string
}
