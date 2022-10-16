import {BadRequestException, Injectable, Logger} from "@nestjs/common";
import {CreateProductDto} from "./dto/create-product.dto";
import {UpdateProductDto} from "./dto/update-product.dto";
import {Connection} from "typeorm";
import {ProductsQuery} from "../../common/database/queries";
import {uploadFile} from "../../helpers/upload-file";
import {Translate} from "../../helpers/translator";
import {Languages} from "../../helpers/consts";
import {CreateProductNoteDto} from "./dto/create-product-note.dto";
import {getProductNotes} from "../../common/database/queries/products";
import {translateProduct} from "./helper/translate-product";

@Injectable()
export class ProductsService {
    constructor(
        private readonly connection: Connection
    ) {
    }

    async create(createProductDto: CreateProductDto, files) {
        try {
            let imageJson = {};
            for (let file of files) {
                imageJson[Date.now()] = uploadFile(file);
            }
            await this.connection.query(ProductsQuery.createProductQuery(createProductDto, imageJson));
            return {
                msg: "You have successfully created a product"
            };
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    async getImage(image, res) {
        try {
            return res.sendFile(image, {root: "src/common/upload"});
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    async findAll(limit: number, offset: number, lang: string, category: number) {
        try {
            const result = [];
            let products = await this.connection.query(ProductsQuery.getAllProducts(limit, offset));
            if (category) {
                products = await this.connection.query(ProductsQuery.getAllProductQuery(limit, offset, category));
            }
            const names = products.map(i => i.name)
            let translatedRes: string[] = await Promise.all([Translate(names, Languages[lang])])
            const splitSymbol = lang == 'AR' ? '،' : ','
            translatedRes = translatedRes[0].split(splitSymbol)
            let index = 0
            for (let product of products) {
                let {description, name} = product
                if (lang) {
                    name = translatedRes[index]
                }
                const images = Object.values(product.images);
                result.push({...product, images: images, description, name});
                index++
            }
            return result;
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    async findOne(id: string, lang: string) {
        try {
            const product = (await this.connection.query(ProductsQuery.getProductById(id)))[0];
            let {description, name} = product
            let languageType = Languages[lang]
            const translatedRes = await Promise.all([Translate(description, languageType), Translate(name, languageType)])
            description = translatedRes[0]
            name = translatedRes[1]
            const images = Object.values(product.images);

            // //
            let top_notes = await this.connection.query(getProductNotes(id, 'Top Note'))
            let middle_notes = await this.connection.query(getProductNotes(id, 'Middle Note'))
            let base_notes = await this.connection.query(getProductNotes(id, 'Base Note'))

            if (lang) {
                const translatedNotes = await Promise.all([
                    translateProduct(top_notes, lang, 'Top Note'),
                    translateProduct(middle_notes, lang, 'Middle Note'),
                    translateProduct(base_notes, lang, 'Base Note')
                ])
                top_notes = translatedNotes[0]
                middle_notes = translatedNotes[1]
                base_notes = translatedNotes[2]
            }
            // //
            return {...product, images: images, description, name, notes: {top_notes, middle_notes, base_notes}};
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    async update(id: string, updateProductDto: UpdateProductDto, files) {
        try {
            const product = await this.connection.query(ProductsQuery.getProductById(id));
            if (product.length > 0) {
                let imageJson = {};
                for (let file of files) {
                    imageJson[Date.now()] = uploadFile(file);
                }
                await this.connection.query(ProductsQuery.updateProductById(id, updateProductDto, imageJson));
                return {
                    msg: "The product has successfully updated"
                };
            }
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    async remove(id: string) {
        try {
            const product = await this.connection.query(ProductsQuery.getProductById(id));
            if (product.length > 0) {
                await this.connection.query(ProductsQuery.deleteProductById(id));
                return {
                    msg: "The product has successfully deleted"
                };
            } else {
                return {
                    msg: "There is not product bay this id"
                };
            }
        } catch (e) {
            throw  new BadRequestException(e.message);
        }
    }

    async findByName(name: string) {
        try {
            return await this.connection.query(ProductsQuery.getProductsByName(name));
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    async createProductNotes(body: CreateProductNoteDto, files): Promise<{ msg: string } | any> {
        try {
            let imageJson = {};
            for (let file of files) {
                imageJson[Date.now()] = uploadFile(file);
            }
            await this.connection.query(ProductsQuery.createProductNote(body, imageJson))
            return {
                msg: "You have successfully created a product note"
            };
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    async getCategories(): Promise<{ [key: number]: string }> {
        try {
            return await this.connection.query(ProductsQuery.getProductCategories())
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }
}
