import { MongooseModule } from '@nestjs/mongoose';

export const DatabaseProvider = [
  MongooseModule.forRoot(
    'mongodb+srv://BookReaderNest:REaUHJJD50suogBQ@bookreaderclaster.dzfrxhv.mongodb.net/bookreader',
  ),
];
