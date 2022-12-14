import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import {ContactUsService} from './contact-us.service';
import {UpdateContactUsDto} from './dto/update-contact-us.dto';
import {CreateContactUsDto} from "./dto/create-contact-us.dto";

@Controller('contact-us')
export class ContactUsController {
    constructor(private readonly contactUsService: ContactUsService) {
    }

    @Post('send')
    async sendEmail(@Body() body: CreateContactUsDto) {
        return await this.contactUsService.sendMail(body);
    }

    @Get()
    findAll() {
        return this.contactUsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.contactUsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateContactUsDto: UpdateContactUsDto) {
        return this.contactUsService.update(+id, updateContactUsDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.contactUsService.remove(+id);
    }
}
