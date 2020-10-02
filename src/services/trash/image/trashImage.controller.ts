import {
  Body,
  Controller,
  Post,
  Get,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  HttpStatus ,
  Param,
  Res
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { editFileName, imageFileFilter } from '..//../../utils/image-upload.utils';
import { TrashImagesService } from './trashImage.service';

@ApiTags('trash')
@Controller('trash')
export class TrashImagesController {
  constructor(
    private readonly trashImageService: TrashImagesService
  ) { }

  @Post('addimage')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: 'D:\\public\\trashImages',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async addImage(@UploadedFile() image) {
    console.log(image)
    const response = {
      originalname: image.originalname,
      filename: image.filename,
    };
    return {
      status: HttpStatus.OK,
      message: 'Image uploaded successfully!',
      data: response,
    };
  }
  
  @Post('addimages')
  @UseInterceptors(
    FilesInterceptor('images', 20, {
      storage: diskStorage({
        destination: 'D:\\public\\trashImages',
        filename: editFileName,
      }),
    }),
  )
  async addImages(@UploadedFiles() images, @Body() body) {
    const response = [];
    console.log(body)
    images.forEach(image => {
      const fileReponse = {
        originalname: image.originalname,
        filename: image.filename,
      };
      response.push(fileReponse);
    });
    return {
      status: HttpStatus.OK,
      message: 'Images uploaded successfully!',
      data: response,
    };
  }


  @Post('editimage')
  async editImage(@Body() image: any) {

  }

  @Post('deleteimage')
  async deleteImage(@Body() image: any) {

  }

  @Get(':imagename')
  getImage(@Param('imagename') image, @Res() res) {
    const response = res.sendFile(image, { root: 'D:\\public\\trashImages' });
    return {
      status: HttpStatus.OK,
      data: response,
    };
  }

  // @Post('getimage')
  // async editmage(@Param('imagename') image, @Res() res) {
  //   const response = res.sendFile(image, { root: './uploads' });
  //   return {
  //     status: HttpStatus.OK,
  //     data: response,
  //   };
  // }
}
