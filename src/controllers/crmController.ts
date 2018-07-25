import { model } from 'mongoose';

import { contactSchema } from '../models/crmModel';
import { Request, Response } from 'express';

const contact = model('Contact', contactSchema);

export class ContactController {

  public getContacts(req: Request, res: Response) {
    contact.find({}, (err, contact) => {
      if (err) {
        res.send(err);
      }

      res.json(contact);

    });
  }

  public addNewContact(req: Request, res: Response) {
    const newContact = new contact(req.body);

    newContact.save((err, contact) => {
      if (err) {
        res.send(err);
      }

      res.json(contact);
    });
  }

  public getContact(req: Request, res:Response) {
    contact.findById(req.params.id, (err, contact) => {
      if (err) {
        res.send(err);
      }
      res.json(contact);
    });
  }

  public updateContact(req: Request, res:Response) {
    contact.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true },
      (err, contact) => {
        if (err) {
          res.send(err);
        }
        res.json(contact);
      });
  }

  public deleteContact(req: Request, res:Response) {
    contact.remove(
      { _id: req.params.id },
      (err) => {
        if (err) {
          res.send(err);
        }
        res.status(204).json({ message: 'Contact deleted successfully' });
      });
  }

}
