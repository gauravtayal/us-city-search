import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RateLimitDocument = RateLimit & Document;

@Schema({
  collection: 'rateLimit',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class RateLimit {
  @Prop()
  _id: string;

  @Prop({ required: true })
  ipAddress: string;

  @Prop()
  count: number;

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;
}

export const RateLimitSchema = SchemaFactory.createForClass(RateLimit);
