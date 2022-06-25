import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Connection } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private readonly connection: Connection) {}

  async create(dto: CreateUserDto) {
    return await this.connection.query(
      `INSERT INTO users(name,email) VALUES('${dto.name}','${dto.email}')`,
    );
  }

  async findAll() {
    return await this.connection.query('SELECT * FROM users');
  }

  findOne(id: number) {
    // return this.userRepository.find(id);
  }

  update(id: number, dto: UpdateUserDto) {
    // return this.userRepository.update(id, dto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
