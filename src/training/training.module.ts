import { Module } from '@nestjs/common';
import { TrainingService } from './training.service';
import { TrainingController } from './training.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { Training, TrainingSchema } from 'src/schemas/trainig.chemas';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/constans';
import { JwtStrategy } from 'src/auth/midleware/jwtPasport';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Training.name, schema: TrainingSchema },
    ]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [TrainingService, JwtStrategy],
  controllers: [TrainingController],
})
export class TrainingModule {}
