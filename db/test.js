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

describe('GET /api/map/:email/:id', () => {
    test('get specific map', async () => {
        const response = await request(app).get('/api/map/:email/:id');
        expect(response.status).toEqual(200);
    });
});

describe('GET /api/maps', () => {
    test('get all users', async () => {
        const response = await request(app).get('/api/maps');
        expect(response.status).toEqual(200);
    });
});

// describe('POST /api/map', () => {
//     test('create a new map', async () => {
//         const newMapData = {
//             email: 'johnDoe@estonybrook.edu',
//             name: 'Test Map',
//             file: {}, 
//     };
//     const response = await request(app)
//         .post('/api/map')
//         .send(newMapData)
//         .expect('Content-Type', /json/)
//         .expect(201);

//     expect(response.body).toMatchObject({
//         name: newMapData.name,
//         chat: [{}],
//         file: newMapData.file,
//     });
//     });

//     test('400 when file is not exist', async () => {

//     await request(app)
//         .post('/api/map')
//         .expect(400)
//         .then((response) => {
//         expect(response.body).toEqual({ message: 'File is required.' });
//         });
//     });
// });

describe('PUT /api/map/:email/:id', () => {
    test('update a map with email and id', async () => {
        const email = 'johnDoe@stonybrook.edu';
        const id = 'johnDoe000';
        const updateData = {
            name: 'Updated Test Map',
            chat: [],
            file: {},
            font: 'Arial',
            color: {},
            legend: 'Updated legend'
        };
        const response = await request(app)
            .put(`/api/map/${email}/${id}`)
            .send(updateData)
            .expect(200);
        expect(response.body).toMatchObject({
            id: id,
            name: updateData.name,
            chat: updateData.chat,
            file: updateData.file,
            font: updateData.font,
            color: updateData.color,
            legend: updateData.legend
        });
    });
    test('404 Not Found when email is missing', async () => {
        const id = 'johnDoe000';
        const updateData = {
        };
        await request(app)
            .put(`/api/map//${id}`) // Intentionally missing email
            .expect(404);
    });
    test('should respond with 404 Not Found when id is missing', async () => {
        const email = 'johnDoe@stonybrook.edu';
        await request(app)
            .put(`/api/map/${email}/`) // Intentionally missing id
            .expect(404);
});
});

describe('DELETE /api/map/:email/:id', () => {
    const email = 'johnDoe@stonybrook.edu';
    const id = 'johnDoe000';

    test('404 if email is not exist', async () => {
        await request(app)
            .delete(`/api/map/${''}/${id}`)
            .expect(404);
    });

    test('404 if id is not exist', async () => {
        await request(app)
        .delete(`/api/map/${email}/${''}`)
        .expect(404);
    });
});