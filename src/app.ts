import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { Routes } from './routes/crmRoutes';
import { MONGODB_URI } from './config';

class App {
  public app: express.Application;
  public routePrv: Routes = new Routes;

  public mongoUrl: string = MONGODB_URI;

  constructor() {
    this.app = express();
    this.config();
    this.routePrv.routes(this.app);
    this.mongoSetup();
  }

  private config(): void {
    // support application/json type post data
    this.app.use(bodyParser.json());

    // support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private mongoSetup(): void {
    (<any>mongoose).Promise = global.Promise;
    mongoose.connect(this.mongoUrl);
  }
}

export default new App().app;
