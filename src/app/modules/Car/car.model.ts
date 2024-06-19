import { Schema, Types, model } from 'mongoose';
import { TCar } from './car.interface';

const carSchema: Schema = new Schema<TCar>(
  {
    _id: { type: Types.ObjectId, auto: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    color: { type: String, required: true },
    isElectric: { type: Boolean, required: true },
    features: { type: [String], required: true },
    pricePerHour: { type: Number, required: true },
    status: {
      type: String,
      enum: ['available', 'unavailable'],
      default: 'available',
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Car = model<TCar>('Car', carSchema);
