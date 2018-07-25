import { Application, Request, Response } from 'express';

import { ContactController } from '../controllers/crmController';

export class Routes {
  public contactController: ContactController = new ContactController();

  public routes(app: Application): void {
    app.route('/').get((req: Request, res: Response) => {
      res.status(200).send({
        message: 'GET successfull!',
      });
    });

    app.route('/contacts')
      .get(this.contactController.getContacts)
      .post(this.contactController.addNewContact);

    app.route('/contacts/:id')
      .get(this.contactController.getContact)
      .put(this.contactController.updateContact)
      .delete(this.contactController.deleteContact);
  }
}
