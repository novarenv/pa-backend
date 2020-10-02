import * as mongoose from 'mongoose';

export const TrashesSchema = new mongoose.Schema(
  {
    img: String
  },
  {
    versionKey: false,
  },
);
