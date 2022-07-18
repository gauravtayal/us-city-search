import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://root:9bdd7j0JlNOmuOW1@uscities.fzouh.mongodb.net/cities',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
