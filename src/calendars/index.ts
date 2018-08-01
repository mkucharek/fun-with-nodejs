import { Application, Request, Response } from 'express';
import { CalendarRoutes } from './calendar.routes';
import { CalendarRepository } from './calendar.repository';
import { CalendarController } from './calendar.controller';

export default function init(app: Application) {
  const repository = new CalendarRepository();
  const controller = new CalendarController(repository);

  const routes = new CalendarRoutes(controller);

  console.log('Initializing CalendarRoutes', routes);
  routes.routes(app);
}
