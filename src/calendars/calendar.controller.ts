import { Request, Response } from 'express';
import { CalendarRepository } from './calendar.repository';
import { ValidationError, CastError } from 'mongoose';

export class CalendarController {

  calendarRepository: CalendarRepository;

  constructor(calendarRepository: CalendarRepository) {
    console.log('Initializing controller with', calendarRepository);
    this.calendarRepository = calendarRepository;
  }

  getCalendars(req: Request, res: Response) {
    this.calendarRepository.findAll()
      .then(calendar => res.json(calendar))
      .catch((err) => {
        console.log('Caught error fetching all calendars', err);
        res.status(500).send(err);
      });

  }

  getCalendar(req: Request, res: Response) {
    this.calendarRepository.findOne(req.params.id)
      .then((calendar) => {
        if (!calendar) {
          console.debug('Calendar with id=', req.params.id, 'not found');
          return res.status(404).send();
        }
        console.debug('Found calendar', calendar);
        res.json(calendar);
      })
      .catch((err) => {
        console.warn('Caught error when fetching a calendar', err.message);
        if (err instanceof CastError) {
          res.status(404).send();
        } else {
          res.status(500).send(err);
        }
      });

  }

  addNewCalendar(req: Request, res: Response) {
    this.calendarRepository.save(req.body)
      .then((calendar) => {
        res.json(calendar);
      })
      .catch((err) => {
        console.warn('Caught error when saving new calendar', err);
        if (err.errors) {
          // it's a ValidationError
          res.status(422).send({ errors: err.errors });
        } else {
          res.status(500).send(err);
        }
      });
  }

  updateCalendar(req: Request, res: Response) {
    this.calendarRepository.update(req.params.id, req.body)
      .then(calendar => res.json(calendar))
      .catch(err => res.status(500).send(err));
  }

  deleteCalendar(req: Request, res: Response) {
    this.calendarRepository.delete(req.params.id)
      .then(() => res.status(204).json({ message: 'Contact deleted successfully' }))
      .catch((err) => {
        console.warn('Caught error when deleting a calendar', err.message);
        if (err instanceof CastError) {
          res.status(404).send();
        } else {
          res.status(500).send(err);
        }
      });
  }

}
