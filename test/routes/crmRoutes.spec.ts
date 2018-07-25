// tslint:disable:import-name
import request from 'supertest';
import app from '../../src/app';
import mongoose from 'mongoose';

describe('GET /', () => {
  it('should return 200 OK', () => {
    return request(app)
      .get('/')
      .expect(200);
  });

  afterAll(() => {
    mongoose.connection.close();
  });

});
