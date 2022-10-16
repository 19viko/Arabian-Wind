import {Controller, Get, Post, UploadedFiles, UseInterceptors} from '@nestjs/common';
import { AppService } from './app.service';
import {FilesInterceptor} from "@nestjs/platform-express";
import {uploadFile} from "./helpers/upload-file";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/language-code')
  getLanguages() {
    return this.appService.getLanguages();
  }

  @Post()
  @UseInterceptors(FilesInterceptor("images"))
  test( @UploadedFiles() files){
    let imageJson = {};
    for (let file of files) {
      imageJson[Date.now()] = uploadFile(file);
    }
    console.log(imageJson)
  }
}
