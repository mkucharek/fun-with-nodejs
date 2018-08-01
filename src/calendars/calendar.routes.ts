import { Application, Request, Response } from 'express';
import { CalendarController } from './calendar.controller';

export class CalendarRoutes {
  public calendarController: CalendarController;

  constructor(calendarController: CalendarController) {
    console.log('Initializing routes with', calendarController);
    this.calendarController = calendarController;
  }

  public routes(app: Application): void {
    app.route('/calendars')
      .get((req: Request, res: Response) => this.calendarController.getCalendars(req, res))
      .post((req: Request, res: Response) => this.calendarController.addNewCalendar(req, res));

    app.route('/calendars/:id')
      .get((req: Request, res: Response) => this.calendarController.getCalendar(req, res))
      .put((req: Request, res: Response) => this.calendarController.updateCalendar(req, res))
      .delete((req: Request, res: Response) => this.calendarController.deleteCalendar(req, res));
  }
}
