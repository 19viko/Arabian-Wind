import { MiddlewareConsumer, Module, Patch, RequestMethod } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductsModule } from "./resources/products/products.module";
import { AuthModule } from "./resources/auth/auth.module";
import { JwtModule } from "@nestjs/jwt";
import { JWT } from "./helpers/consts";
import { UserMiddleware } from "./middlewares/user.middleware";
import { ContactUsModule } from './resources/contact-us/contact-us.module';
import {MailerModule} from "@nestjs-modules/mailer";
import {ConfigModule, ConfigService} from "@nestjs/config";
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        transport: {
          service: "Gmail",
          auth: {
            user: 'arabian.wind.2022@gmail.com',
            pass: 'thvefhjkitmxbkoc',
          },
        },
        defaults: {
          from: '<sendgrid_from_email_address>'
        },
        template: {
          dir: join(__dirname, './templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true
          }
        }
      }),
      inject: [ConfigService]
    }), ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5431,
      username: "admin",
      password: "admin",
      database: "arabian-wind",
      synchronize: true
    }),
    ProductsModule,
    AuthModule,
    JwtModule.register(JWT),
    ContactUsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserMiddleware)
      .exclude({
        method: RequestMethod.POST,
        path: "auth/login"
      }, {
        method: RequestMethod.POST,
        path: "users/register"
      })
      .forRoutes({
          method: RequestMethod.POST,
          path: "products"
        },
        {
          method: RequestMethod.PATCH,
          path: "products/:id"
        },
        {
          method: RequestMethod.DELETE,
          path: "products/:id"
        }
      );
  }
}
