import { describe, test } from '@jest/globals';
import request from 'supertest';

import app from '../src/app';

describe('Root API', () => {
  test('GET unsupported route returns 404', (done) => {
    request(app)
      .get('/foo')
      .expect('Content-Type', /json/)
      .expect({
        error: 'unsupported route',
        details: '/foo',
      })
      .expect(404, done);
  });

  test('GET /v1/ping responds as expected', (done) => {
    request(app)
      .get('/v1/ping')
      .expect('Content-Type', /json/)
      .expect({})
      .expect(200, done);
  });
});
