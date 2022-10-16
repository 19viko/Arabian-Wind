import { JwtService } from "@nestjs/jwt";
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException
} from "@nestjs/common";

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService
  ) {
  }

  async use(req: any, res: any, next: () => void) {
    const token: string = req.headers.authorization
      ?.replace("Bearer", "")
      ?.trim();

    if (!token) {
      throw new UnauthorizedException("auth.INVALID_TOKEN");
    }

    try {
      await this.jwtService.verify(token);
      const user = this.jwtService.decode(token);
      if (user) {
        req.user = user;
        next();
      } else {
        throw new UnauthorizedException("auth.NOT_AUTHORIZED");
      }
    } catch {
      throw new UnauthorizedException("auth.INVALID_TOKEN");
    }
  }
}
