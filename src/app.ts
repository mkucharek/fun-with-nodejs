import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { MONGODB_URI } from './config';

import calendars from './calendars';

class App {
  public app: express.Application;

  public mongoUrl: string = MONGODB_URI;

  constructor() {
    this.app = express();
    this.config();
    this.mongoSetup();
    this.routeSetup();
  }

  private config(): void {
    // support application/json type post data
    this.app.use(bodyParser.json());

    // support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private mongoSetup(): void {
    mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
  }

  private routeSetup(): void {
    calendars(this.app);
  }
}

export default new App().app;
