import { Document } from 'mongoose';

export interface ITrashes extends Document {
  readonly _id?: Number;
  readonly lat?: String;
  readonly long?: String;
  readonly time?: Array<String>;

}