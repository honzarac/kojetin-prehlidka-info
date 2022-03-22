import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ShowService } from './show/show.service';
import {ServeStaticModule} from "@nestjs/serve-static";
import { join } from 'path';
import {ShowTransformer} from "./show/show.transformer";
import {PhotoService} from "./photo/photo.service";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      serveRoot: '/static'
    }),
  ],
  controllers: [AppController],
  providers: [ShowService, ShowTransformer, PhotoService],
})
export class AppModule {}
