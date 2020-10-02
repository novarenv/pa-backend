import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ITrashes } from '../../../models/trash/trash.interface';

@Injectable()
export class TrashImagesService {
  constructor(
    @InjectModel('Trashes') private readonly trashesModel: Model<ITrashes>,
  ) { }

  async addTrashImage(images: any) {
    const trash: any = {};
  }
}