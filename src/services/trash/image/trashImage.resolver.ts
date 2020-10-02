import {
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  HttpStatus,
} from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Field, ObjectType, InputType } from "@nestjs/graphql";
import { GraphQLUpload } from 'graphql-upload';

import {
  editFileName,
  imageFileFilter,
} from '..//../../utils/image-upload.utils';
import { TrashImagesService } from './trashImage.service';
import { TrashImage } from './trashImage.dto';

@ObjectType()
class ImageData {
  @Field() readonly originalName: String;
  @Field() readonly fileName: String;
}

@InputType()
class ImageInput {
  @Field() readonly fieldname: String;
  @Field() readonly originalname: String;
  @Field() readonly encoding: String;
  @Field() readonly mimetype: String;
  @Field() readonly destination: String;
  @Field() readonly filename: String;
  @Field() readonly path: String;
  @Field() readonly size: Number;
}

@ObjectType()
class MutationRes {
  @Field() readonly status: String;
  @Field() readonly message: String;
  @Field() readonly data: ImageData;
};

@Resolver()
export class TrashImagesResolver {
  constructor(private readonly trashImagesService: TrashImagesService) {}

  @Query(() => [TrashImage])
  async trashImg() {
    return [
      {
        imgId: '1',
        img: 'A',
      },
    ];
  }

  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: 'D:\\public\\trashImages',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @Mutation(() => MutationRes)
  async addTrashImg(@Args('img') @UploadedFile() img: ImageInput) {
    const response = {
      originalName: img?.originalname,
      fileName: img?.filename,
    };
    return {
      status: HttpStatus.OK,
      message: 'Image uploaded successfully!',
      data: response,
    };
  }
}
