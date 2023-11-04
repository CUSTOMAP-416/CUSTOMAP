const request = require('supertest');
const fs = require("fs");
const app = require('./server');

describe('GET /', () => {
    test('upload webpage', async () => {
        const response = await request(app).get('/');
        expect(response.status).toEqual(200);
    });
});

describe('GET /api/user/:id', () => {
    test('get specific user', async () => {
        const response = await request(app).get('/api/user/:id');
        expect(response.status).toEqual(200);
    });
});

describe('GET /api/users', () => {
    test('get all users', async () => {
        const response = await request(app).get('/api/users');
        expect(response.status).toEqual(200);
    });
});