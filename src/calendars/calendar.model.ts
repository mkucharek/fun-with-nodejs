// tslint:disable:variable-name

import { Document, Schema, Model, model } from 'mongoose';
import { ICalendar } from './calendar';

export interface ICalendarModel extends ICalendar, Document {}

export const CalendarSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: 'Enter a name',
    },
    description: String,
    color: {
      type: String,
      required: 'Provide a color',
    },
  },
  {
    timestamps: true,
  },
);

export const Calendar: Model<ICalendarModel> = model<ICalendarModel>('Calendar', CalendarSchema);
