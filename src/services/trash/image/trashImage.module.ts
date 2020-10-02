import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';

import { TrashesSchema } from '../../../models/trash/trash.schema';

import { TrashImagesController } from './trashImage.controller';
import { TrashImagesService } from './trashImage.service';
import { TrashImagesResolver } from './trashImage.resolver';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: 'Trashes', schema: TrashesSchema, collection: 'trashes' }]),
    MulterModule.register({
      dest: 'D:\\public\\trashImages',
    })
  ],
  controllers: [TrashImagesController],
  providers: [TrashImagesService, TrashImagesResolver],
  exports: [TrashImagesService]
})

export class TrashImagesModule {}