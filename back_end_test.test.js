const request = require('supertest');
const cookieParser = require('cookie')
const {app, db} = require('./server/index.js');

beforeAll(async () => {
  await db.collection('users').drop();
});

const userData = {
    username: 'John Doe', 
    email: 'john.doe@stonybrook.edu', 
    phone: '0',
    password: '000000000',
    passwordVerify: '000000000'
};

describe('POST /auth_store/register', () => {
    test('creates a new user', async () => {
        const response = await request(app)
            .post('/auth_store/register')
            .send(userData)
            .expect(200);
        
        expect(userData['username']).toEqual(response.body.user['username'])
        expect(userData['email']).toEqual(response.body.user['email'])
    });

    test('All fields should be provided', async () => {
        const response = await request(app)
            .post('/auth_store/register')
            .send(userData)
            .expect(400);
    });

    test('password verify does not match', async () => {
        const response = await request(app)
            .post('/auth_store/register')
            .send(userData)
            .expect(400);
    });
});

describe('POST /auth_store/login', () => {
    test('400 Missing required fields', async () => {
        await request(app)
            .post('/auth_store/login')
            .send({
                username: "",
                email: ""
            })
            .expect(400);
    });
    test('401 non-existing user', async () => {
        await request(app)
            .post('/auth_store/register')
            .send(userData)

        await request(app)
            .post('/auth_store/login')
            .send({
                email: "Jenny.doe@stonybrook.edu",
                password: userData['password']
            })
            .expect(401);
    });
    test('401 Incorrect password', async () => {
        await request(app)
            .post('/auth_store/register')
            .send(userData)

        await request(app)
            .post('/auth_store/login')
            .send({
                email: userData['email'],
                password: "011111111111111111111"
            })
            .expect(401);
    });
    test('200 successful login', async () => {
        await request(app)
            .post('/auth_store/register')
            .send(userData)
    
        await request(app)
            .post('/auth_store/login')
            .send(userData)
            .expect(200);
    });
})

describe('GET /auth_store/loggedIn', () => {
    test('check logged in', async () => {
        let response = await request(app)
            .post('/auth_store/register')
            .send(userData)
        
        response = await request(app)
            .post('/auth_store/login')
            .send(userData)
            .expect(200);
        const cookie = cookieParser.parse(response.headers['set-cookie'][0]).token

        await request(app)
            .get('/auth_store/loggedIn')
            .set({
                cookies: {
                    token: cookie
                }
            })
            .expect(200);
        
        expect(userData['username']).toEqual(response.body.user['username'])
        expect(userData['email']).toEqual(response.body.user['email'])
    });
})

describe('POST /auth_store/forgetPassword', () => {
    test('400 Missing required fields', async () => {
        await request(app)
            .post('/auth_store/forgetPassword')
            .send({
                username: "",
                email: "",
                phone: ""
            })
            .expect(400);
    });
    test('404 No matching info', async () => {
        await request(app)
            .post('/auth_store/register')
            .send(userData)

        await request(app)
            .post('/auth_store/forgetPassword')
            .send({
                username: "jen",
                email: "jen@stonybrook.edu",
                phone: "2023"
            })
            .expect(404);
    });
    test('200 successful forgetPassword', async () => {
        await request(app)
            .post('/auth_store/register')
            .send(userData)
        
        await request(app)
            .post('/auth_store/forgetPassword')
            .send({
                username: userData['username'],
                email: userData['email'],
                phone: userData['phone']
            })
            .expect(200);
    });
})

describe(`PUT /auth_store/Dashboard/:email`, () => {
    test('200 successful username change', async () => {
        await request(app)
            .post('/auth_store/register')
            .send(userData)
        
        const newData = {
            username: 'DoeDoe', 
            email: 'john.doe@stonybrook.edu', 
            phone: '1',
            password: '000000000',
            passwordVerify: '000000000'
        }

        const response = await request(app)
            .put('/auth_store/Dashboard/john.doe@stonybrook.edu')
            .send(newData)
            .expect(200);

        expect(newData['username']).toEqual(response.body.user['username'])
    });
    test('200 successful password change', async () => { 
        const newData = {
            username: 'DoeDoe', 
            email: 'john.doe@stonybrook.edu', 
            phone: '1',
            password: '000000001',
            passwordVerify: '000000001'
        }

        await request(app)
            .put('/auth_store/Dashboard/john.doe@stonybrook.edu')
            .send(newData)
            .expect(200);

        await request(app)
            .get('/auth_store/logout')
            .expect(200);

        await request(app)
            .post('/auth_store/login')
            .send(newData)
            .expect(200)
    });
})

afterAll(async () => {
  if (db && db.close) {
    await db.close();
  }
});
