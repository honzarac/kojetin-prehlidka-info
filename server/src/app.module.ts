import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ShowService } from './show/show.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [ShowService],
})
export class AppModule {}
