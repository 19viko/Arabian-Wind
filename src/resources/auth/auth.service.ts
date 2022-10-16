import { BadRequestException, Injectable } from "@nestjs/common";
import { AuthLoginDto } from "./dto/auth.login.dto";
import { Connection } from "typeorm";
import { UsersQuery } from "../../common/database/queries";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { SECRET_KEY } from "../../helpers/consts";

@Injectable()
export class AuthService {
  constructor(
    private readonly connection: Connection,
    private readonly jwtService: JwtService
  ) {
  }

  async login(authLoginDto: AuthLoginDto) {
    try {
      const { email, password } = authLoginDto;
      const user = await this.connection.query(UsersQuery.getUserByEmail(email));
      const isMatch = await bcrypt.compare(password, user[0]?.password || "");
      if (user[0] && isMatch) {
        delete user[0]?.password;
        const payload = user[0];
        return {
          access_token: this.jwtService.sign(payload, {
            secret: SECRET_KEY
          })
        };
      } else {
        throw new BadRequestException("You don't have access");
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
