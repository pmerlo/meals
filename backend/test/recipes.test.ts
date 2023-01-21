import {
  describe,
  test,
  beforeEach,
  afterAll,
  afterEach,
  expect,
} from '@jest/globals';
import { MongoClient, ObjectId } from 'mongodb';
import request from 'supertest';

import app from '../src/app';
import { disconnectDb, Recipe } from '../src/routes/recipes';

const SEED_ID = '63ba13b16937d34102fe8054';
const SEED_DATA: Partial<Recipe> = {
  name: 'Mashed potatoes',
  portions: 5,
  stock: 5,
  date: new Date().toISOString(),
  ingredients: [
    {
      name: 'Potato',
      qty: '5 lb',
    },
  ],
};

const MONGODB_URL = 'mongodb://root:password@localhost:27017';

jest.setTimeout(500);

describe('Endpoint recipes', () => {
  beforeEach((done) => {
    MongoClient.connect(MONGODB_URL).then((client) => {
      const collection = client.db('my_app_test').collection('recipes');
      collection
        .insertOne({ _id: new ObjectId(SEED_ID), ...SEED_DATA })
        .then(() => {
          client.close();
          done();
        });
    });
  });

  afterEach((done) => {
    MongoClient.connect(MONGODB_URL).then((client) => {
      const collection = client.db('my_app_test').collection('recipes');
      collection.drop().then(() => {
        client.close();
        done();
      });
    });
  });

  afterAll((done) => {
    disconnectDb().then(() => done());
  });

  describe('POST /v1/recipes', () => {
    test('valid body returns new item', (done) => {
      request(app)
        .post('/v1/recipes')
        .send({ _id: new ObjectId(SEED_ID), ...SEED_DATA })
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          const expected = {
            _id: new ObjectId(SEED_ID).toString(),
            ...SEED_DATA,
          };
          expect(res.body).toStrictEqual(expected);
          done();
        });
    });

    test('invalid body returns error', (done) => {
      request(app)
        .post('/v1/recipes')
        .send({ foo: 'bar' })
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err, res) => {
          expect(res.body.errorCode).toBe('SCHEMA_VALIDATION_ERROR');
          expect(res.body).toHaveProperty('details');
          done();
        });
    });
  });

  describe('GET /v1/recipes', () => {
    test('returns list of recipes', (done) => {
      jest.setTimeout(1000);
      request(app)
        .get('/v1/recipes')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          const expected = [{ name: 'Mashed potatoes', portions: 5 }];
          expect(res.body).toMatchObject(expected);
          done();
        });
    });
  });

  describe('GET /v1/recipes/:id', () => {
    test('valid id returns expected item', (done) => {
      request(app)
        .get(`/v1/recipes/${SEED_ID}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          const expected = { name: 'Mashed potatoes', portions: 5 };
          expect(res.body).toMatchObject(expected);
          done();
        });
    });

    test('invalid id returns error', (done) => {
      request(app)
        .get(`/v1/recipes/0123456789abcdef01234567`)
        .expect('Content-Type', /json/)
        .expect(404)
        .end((err, res) => {
          const expected = {
            errorCode: 'INVALID_ID',
            details: 'Resource does not exist',
          };
          expect(res.body).toMatchObject(expected);
          done();
        });
    });
  });

  describe('PUT /v1/recipes/:id', () => {
    test('valid id and body returns updated item', (done) => {
      const newValue: Recipe = {
        name: 'Salad',
        portions: 4,
        stock: 4,
        date: new Date().toISOString(),
        ingredients: [{ name: 'Lettuce', qty: '6 oz' }],
      };
      request(app)
        .put(`/v1/recipes/${SEED_ID}`)
        .send(newValue)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          const expected = { _id: SEED_ID, ...newValue };
          expect(res.body).toStrictEqual(expected);
          done();
        });
    });

    test('invalid id returns error', (done) => {
      const newValue: Recipe = {
        name: 'Salad',
        portions: 4,
        stock: 4,
        date: new Date().toISOString(),
        ingredients: [{ name: 'Lettuce', qty: '6 oz' }],
      };
      request(app)
        .put(`/v1/recipes/012345678901234567890123`)
        .send(newValue)
        .expect('Content-Type', /json/)
        .expect(404)
        .end((err, res) => {
          const expected = {
            errorCode: 'INVALID_ID',
            details: 'Resource does not exist',
          };
          expect(res.body).toMatchObject(expected);
          done();
        });
    });

    test('invalid body returns error', (done) => {
      request(app)
        .put(`/v1/recipes/${SEED_ID}`)
        .send({ foo: 'bar' })
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err, res) => {
          expect(res.body.errorCode).toBe('SCHEMA_VALIDATION_ERROR');
          expect(res.body).toHaveProperty('details');
          done();
        });
    });
  });

  describe('DEL /v1/recipes/:id', () => {
    test('valid id deletes resource', (done) => {
      request(app)
        .delete(`/v1/recipes/${SEED_ID}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          const expected = { deleted: true };
          expect(res.body).toStrictEqual(expected);
          done();
        });
    });

    test('invalid id returns error', (done) => {
      request(app)
        .delete(`/v1/recipes/0123456789abba9876543210`)
        .send({ foo: 'bar' })
        .expect('Content-Type', /json/)
        .expect(404)
        .end((err, res) => {
          const expected = {
            errorCode: 'INVALID_ID',
            details: 'Resource does not exist',
          };
          expect(res.body).toMatchObject(expected);
          done();
        });
    });
  });
});
