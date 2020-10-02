import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrashImagesController } from './services/trash/image/trashImage.controller';
import { TrashImagesModule } from './services/trash/image/trashImage.module';

const dotenv = require('dotenv');

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    TrashImagesModule
  ],
  controllers: [AppController, TrashImagesController],
  providers: [AppService],
})
export class AppModule {}
