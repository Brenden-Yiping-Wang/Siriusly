// user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Tag extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ unique: true, default: () => require('uuid').v4() })
  tag_id: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
