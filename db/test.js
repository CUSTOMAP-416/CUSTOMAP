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

// This is test code for createUser. After connect to front-end server, can use this
// describe('POST /api/users', () => {
//     test('creates a new user', async () => {
//         const userData = {
//             name: 'John Doe', 
//             phone: '631-XXX-XXXX', 
//             id: 'johndoe000', 
//             email: 'john.doe@stonybrook.edu', 
//             password: '0000'};

//         const response = await request(app)
//             .post('/api/users')
//             .send(userData)
//             .expect(201);
//             expect(response.body).toEqual(expect.objectContaining({
//                 name: userData.name,
//                 phone: userData.phone,
//                 email: userData.email,
//                 id: userData.id,
//             }))
            
//     });
// });

describe('PUT /api/user/:id', () => {
    test('updates the user and returns the updated user data', async () => {
      // You need to replace '1' with the actual id of the user you expect to update
    const userId = '1'; 
    const updatedUserData = {
        name: 'Jane Doe',
        phone: '631-YYY-YYYY',
        password: '1234'
    };
    const response = await request(app)
        .put(`/api/user/${userId}`)
        .send(updatedUserData);

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(expect.any(Object));
    });
    test('404 if no user id is provided', async () => {
    const response = await request(app)
        .put('/api/user/') // No ID provided
    expect(response.statusCode).toBe(404);
    });
});