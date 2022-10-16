import { Injectable } from '@nestjs/common';
import { UpdateContactUsDto } from './dto/update-contact-us.dto';
import {MailerService} from "@nestjs-modules/mailer";

@Injectable()
export class ContactUsService {
  constructor(private mailerService: MailerService) {}

  // async sendMail(email: string, name: string) {
  //   console.log(email)
  //   await this.mailerService.sendMail({
  //     to: email,
  //     subject: 'Greeting from NestJS NodeMailer',
  //     template: 'email',
  //     context: {
  //       name: name
  //     }
  //   })
  // }

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
