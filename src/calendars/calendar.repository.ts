import { Calendar, ICalendarModel } from './calendar.model';
import { ICalendar } from './calendar';

export class CalendarRepository {

  public findAll(): Promise<ICalendarModel[]> {
    return Calendar.find({}).exec();
  }

  public findOne(id: String): Promise<ICalendarModel> {
    return Calendar.findById(id).exec();
  }

  public save(calendar: ICalendar): Promise<ICalendarModel> {
    const newCalendar = new Calendar(calendar);
    return newCalendar.save();
  }

  public update(id: String, calendar: ICalendar): Promise<ICalendarModel> {
    return Calendar.findOneAndUpdate({ _id: id }, calendar, { new: true }).exec();
  }

  public delete(id: String): Promise<any> {
    return Calendar.remove({ _id: id }).exec();
  }

}
