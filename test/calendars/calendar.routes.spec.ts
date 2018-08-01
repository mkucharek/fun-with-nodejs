// tslint:disable:import-name
import request from 'supertest';
import app from '../../src/app';
import mongoose from 'mongoose';
import { assert } from 'chai';
import { clearCollection, addCalendar } from './calendar.fixture';

beforeEach(() => {
  clearCollection();
});

afterAll(() => {
  clearCollection();
  mongoose.connection.close();
});

describe('GET /calendars', () => {
  it('should return 200 OK and empty array', () => {
    return request(app)
      .get('/calendars')
      .expect(200)
      .expect(((res:request.Response) => {
        assert.isArray(res.body, 'should be an array');
        assert.isEmpty(res.body, 'should be empty');
      }));
  });

  it('should return existing calendars', async () => {
    // given:
    await addCalendar({ name: 'Test1', color: '#ffffff' });
    await addCalendar({ name: 'Test2', color: '#aaaaaa' });

    return request(app)
      .get('/calendars')
      .expect(200)
      .expect(((res:request.Response) => {
        assert.isArray(res.body, 'should be an array');
        assert.lengthOf(res.body, 2, 'should contain 2 items');
      }));
  });

});

describe('POST /calendars', () => {
  it('should return 200 OK for the expected model', () => {
    return request(app)
      .post('/calendars')
      .send({
        name: 'test-calendar',
        color: '#ffffff',
      })
      .set('Accept', 'application/json')
      .expect(200)
      .expect(((res:request.Response) => {
        assert.isObject(res.body);
        assert.property(res.body, '_id');
        assert.property(res.body, 'createdAt');
        assert.property(res.body, 'updatedAt');
        assert.propertyVal(res.body, 'name', 'test-calendar');
        assert.propertyVal(res.body, 'color', '#ffffff');
      }));
  });

  it('should return 422 Unprocessable Entity for malformed model', () => {
    return request(app)
      .post('/calendars')
      .send({
        name: 'test-calendar',
      })
      .set('Accept', 'application/json')
      .expect(422)
      .expect(((res:request.Response) => {
        assert.isObject(res.body);
        assert.nestedPropertyVal(res.body, 'errors.color.message', 'Provide a color');
      }));
  });

});

describe('GET /calendars/:id', () => {
  it('should return 200 OK and the expected model', async () => {
    // given:
    const cal =  await addCalendar({ name: 'Test1', color: '#ffffff' });

    return request(app)
      .get(`/calendars/${cal.id}`)
      .expect(200)
      .expect(((res:request.Response) => {
        assert.isObject(res.body);
        assert.propertyVal(res.body, '_id', cal.id);
        assert.propertyVal(res.body, 'createdAt', cal.createdAt.toISOString());
        assert.propertyVal(res.body, 'updatedAt', cal.updatedAt.toISOString());
        assert.propertyVal(res.body, 'name', 'Test1');
        assert.propertyVal(res.body, 'color', '#ffffff');
      }));
  });

  it('should return 404 Not Found if calendar does not exist', async () => {
    return request(app)
      .get('/calendars/5b5b48217dfa9a77dff8cb4d')
      .expect(404);
  });

  it('should return 404 Not Found if id is malformed', async () => {
    return request(app)
      .get('/calendars/123')
      .expect(404);
  });

  it('should not allow updating createdAt', async () => {
    // given:
    const cal =  await addCalendar({ name: 'Test1', color: '#ffffff' });

    return request(app)
      .put(`/calendars/${cal.id}`)
      .send({
        createdAt: '2018-01-01T00:00:00.000Z',
      })
      .set('Accept', 'application/json')
      .expect(200)
      .expect(((res:request.Response) => {
        assert.isObject(res.body);
        assert.propertyVal(res.body, '_id', cal.id);
        assert.propertyVal(res.body, 'createdAt', cal.createdAt.toISOString());
        assert.propertyVal(res.body, 'name', 'Test1');
        assert.propertyVal(res.body, 'color', '#ffffff');
      }));
  });

});

describe('PUT /calendars/:id', () => {
  it('should return 200 OK if updating the calendar', async () => {
    // given:
    const cal =  await addCalendar({ name: 'Test1', color: '#ffffff' });

    return request(app)
      .put(`/calendars/${cal.id}`)
      .send({
        name: 'Test2',
      })
      .set('Accept', 'application/json')
      .expect(200)
      .expect(((res:request.Response) => {
        assert.isObject(res.body);
        assert.propertyVal(res.body, '_id', cal.id);
        assert.propertyVal(res.body, 'createdAt', cal.createdAt.toISOString());
        assert.property(res.body, 'updatedAt');
        assert.notEqual(res.body.updatedAt, cal.updatedAt.toISOString());
        assert.propertyVal(res.body, 'name', 'Test2');
        assert.propertyVal(res.body, 'color', '#ffffff');
      }));
  });

  it('should not allow updating createdAt', async () => {
    // given:
    const cal =  await addCalendar({ name: 'Test1', color: '#ffffff' });

    return request(app)
      .put(`/calendars/${cal.id}`)
      .send({
        createdAt: '2018-01-01T00:00:00.000Z',
      })
      .set('Accept', 'application/json')
      .expect(200)
      .expect(((res:request.Response) => {
        assert.isObject(res.body);
        assert.propertyVal(res.body, '_id', cal.id);
        assert.propertyVal(res.body, 'createdAt', cal.createdAt.toISOString());
        assert.propertyVal(res.body, 'name', 'Test1');
        assert.propertyVal(res.body, 'color', '#ffffff');
      }));
  });

});

describe('DELETE /calendars/:id', () => {
  it('should return 404 Not Found if id is malformed', () => {
    return request(app)
      .delete(`/calendars/123`)
      .expect(404);
  });

  it('should return 204 No Content if calendar not found', () => {
    return request(app)
      .delete(`/calendars/5b5b48217dfa9a77dff8cb4d`)
      .expect(204);
  });

  it('should return 204 No Content if calendar deleted', async () => {
    // given:
    const cal =  await addCalendar({ name: 'Test1', color: '#ffffff' });

    return request(app)
      .delete(`/calendars/${cal.id}`)
      .expect(204);
  });

});
