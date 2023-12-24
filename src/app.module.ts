import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { TrainingModule } from './training/training.module';
import { PlaningModule } from './planing/planing.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UsersModule,
    BooksModule,
    TrainingModule,
    PlaningModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
