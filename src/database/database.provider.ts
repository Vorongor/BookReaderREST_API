import { MongooseModule } from '@nestjs/mongoose';
import { dbSets } from 'src/constants';

export const DatabaseProvider = [
  MongooseModule.forRoot(dbSets.url || process.env.DATABASE_URL),
];
