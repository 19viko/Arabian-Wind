import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    UseInterceptors,
    UploadedFiles, Res
} from "@nestjs/common";
import {ProductsService} from "./products.service";
import {CreateProductDto} from "./dto/create-product.dto";
import {UpdateProductDto} from "./dto/update-product.dto";
import {FilesInterceptor} from "@nestjs/platform-express";
import {CreateProductNoteDto} from "./dto/create-product-note.dto";

@Controller("products")
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {
    }

    @Post()
    @UseInterceptors(FilesInterceptor("images"))
    create(@Body() createProductDto: CreateProductDto,
           @UploadedFiles() files) {
        return this.productsService.create(createProductDto, files);
    }

    @Get("category")
    getCategories() {
        return this.productsService.getCategories();
    }

    @Get("image/:imagePath")
    getImage(@Param("imagePath") image, @Res() res) {
        return this.productsService.getImage(image, res);
    }

    @Get()
    findAll(
        @Query() paginationQuery
    ) {
        const {offset, limit, lang, category} = paginationQuery;
        return this.productsService.findAll(limit, offset, lang, category);
    }

    @Get("search")
    findByName(
        @Query() paginationQuery
    ) {
        const {name} = paginationQuery;
        return this.productsService.findByName(name);
    }

    @Get(":id")
    findOne(@Param("id") id: string, @Query() query: { lang: string }) {
        return this.productsService.findOne(id, query.lang);
    }

    @Patch(":id")
    @UseInterceptors(FilesInterceptor("images"))
    update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto, @UploadedFiles() files) {
        return this.productsService.update(id, updateProductDto, files);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.productsService.remove(id);
    }

    @Post('notes')
    @UseInterceptors(FilesInterceptor("images"))
    createProductNotes(@Body() body: CreateProductNoteDto, @UploadedFiles() files) {
        return this.productsService.createProductNotes(body, files)
    }
}
