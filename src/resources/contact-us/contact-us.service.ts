import { Injectable } from '@nestjs/common';
import { UpdateContactUsDto } from './dto/update-contact-us.dto';
import {MailerService} from "@nestjs-modules/mailer";
import {CreateContactUsDto} from "./dto/create-contact-us.dto";

@Injectable()
export class ContactUsService {
  constructor(private mailerService: MailerService) {}

  async sendMail(body: CreateContactUsDto) {
    const {email, name, description} = body
    await this.mailerService.sendMail({
      to: 'filipvirabyan12@gmail.com',
      subject: 'Support message from 𝒶𝓇𝒶𝒷𝒾𝒶𝓃-𝓌𝒾𝓃𝒹 web site',
      template: 'email',
      context: {
        name: name,
        received_email: email,
        description
      }
    })
  }

  findAll() {
    return `This action returns all contactUs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contactUs`;
  }

  update(id: number, updateContactUsDto: UpdateContactUsDto) {
    return `This action updates a #${id} contactUs`;
  }

  remove(id: number) {
    return `This action removes a #${id} contactUs`;
  }
}
