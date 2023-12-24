import { Module } from '@nestjs/common';
import { PlaningService } from './planing.service';
import { PlaningController } from './planing.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Plan, PlanSchema } from 'src/schemas/planing.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { Book, BookSchema } from 'src/schemas/book.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constants';
import { JwtStrategy } from 'src/auth/midleware/jwtPasport';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Book.name, schema: BookSchema },
      { name: Plan.name, schema: PlanSchema },
    ]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [PlaningService, JwtStrategy],
  controllers: [PlaningController],
})
export class PlaningModule {}
