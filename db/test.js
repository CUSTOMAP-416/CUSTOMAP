const request = require('supertest');
const fs = require("fs");
const app = require('./server');

describe('GET /', () => {
    test('upload webpage', async () => {
        const response = await request(app).get('/');
        expect(response.status).toEqual(200);
    });
});