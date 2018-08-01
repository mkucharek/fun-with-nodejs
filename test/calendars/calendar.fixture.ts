import mongoose from 'mongoose';
import { ICalendarModel, Calendar } from '../../src/calendars/calendar.model';

export const clearCollection = () => {
  mongoose.connection.collections['calendars'].remove({});
};

export const addCalendar = (calendar: any) => {
  return new Calendar(calendar).save();
};
