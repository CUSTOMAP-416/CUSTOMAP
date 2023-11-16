const request = require('supertest');
const cookieParser = require('cookie')
const {app, db} = require('./server/index.js');

beforeAll(async () => {
  await db.collection('users').drop();
});

const userData = {
    username: 'John Doe', 
    email: 'john.doe@stonybrook.edu', 
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

afterAll(async () => {
  if (db && db.close) {
    await db.close();
  }
});
