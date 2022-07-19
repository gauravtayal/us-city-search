import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CityDocument = City & Document;

@Schema({ collection: 'usCities' })
export class City {
  @Prop()
  name: string;

  @Prop()
  ascii: string;

  @Prop()
  alt_name: string;
}

export const CitySchema = SchemaFactory.createForClass(City);
