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

    test('short password', async () => {
        const response = await request(app)
            .post('/auth_store/register')
            .send({
                username: userData['username'], 
                email: userData['email'], 
                phone: userData['phone'],
                password: '1',
                passwordVerify: '1',
            })
            .expect(400);
    });

    test('phone contains non-numeric characters', async () => {
        const response = await request(app)
            .post('/auth_store/register')
            .send({
                username: userData['username'], 
                email: userData['email'], 
                phone: '^',
                password: userData['password'],
                passwordVerify: userData['passwordVerify'],
            })
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

describe('POST /auth_store/logout', () => {
    test('check logout', async () => {
        // Login and store cookie
        let response = await request(app)
            .post('/auth_store/login')
            .send(userData)
            .expect(200);
    
        const cookie = cookieParser.parse(response.headers['set-cookie'][0]);
    
        response = await request(app)
            .get('/auth_store/loggedIn')
            .set({
                cookies: {
                    token: cookie
                }
            })
            .expect(200); 

        response = await request(app)
            .get('/auth_store/loggedIn')
            .expect(200);

        response = await request(app)
            .get('/auth_store/logout')
            .expect(200);
            
        })
});

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
    test('404 user not found', async () => { 
        const newData = {
            username: 'DoeDoe', 
            email: 'john.doe@stonybrook.edu', 
            phone: '1',
            password: '000000001',
            passwordVerify: '000000001'
        }

        await request(app)
            .put('/auth_store/Dashboard/doe@stonybrook.edu')
            .send(newData)
            .expect(404);
    });
})

describe('GET /auth_store/users', () => {
    test('check all users', async () => {
    await request(app)
        .get('/auth_store/users')
        .expect(200);
    })
});

const testMapFilePath = './server/fork_map/Asia.geojson'
const fs = require('fs');
const mapData = fs.readFileSync(testMapFilePath, 'utf8')

const mapInfo = {
    email: 'john.doe@stonybrook.edu', 
    mapTitle: 'MyMap1',
    mapData: mapData,
    mapDescription: ''
}

console.log("MY MAPDATA: ", mapInfo.mapData)
let mapId = ''

describe('POST /auth_store/createMap', () => {
    test('check createMap', async () => {
        const response = await request(app)
            .post('/auth_store/createMap')
            .send(mapInfo) 
            .expect(200);
        mapId = response.body.mapId

        expect(mapInfo['mapTitle']).toEqual(response.body.map['title'])
        expect(mapInfo['mapDescription']).toEqual(response.body.map['description'])
    });
})

describe('GET /auth_store/getMap', () => {
    test('check getMap', async () => {
        await request(app)
            .post('/auth_store/getMap')
            .send(mapId) 
            .expect(200);
    });
})

describe('GET /auth_store/maps', () => {
    test('check all maps', async () => {
    await request(app)
        .get('/auth_store/maps')
        .expect(200);
    })
});

describe('POST /auth_store/editMap', () => {
    test('edit map title', async () => {
    const newMapInfo = {
        _id: mapId, 
        title: "revised map", 
        description: mapInfo.mapDescription
    }

        await request(app)
            .post('/auth_store/editMap')
            .send(newMapInfo) 
            .expect(200);
    });

    test('edit map description', async () => {
        const newMapInfo = {
            _id: mapId, 
            title: mapInfo.title, 
            description: 'Asia'
        }
    
        await request(app)
            .post('/auth_store/editMap')
            .send(newMapInfo) 
            .expect(200);
    });
})

describe('DELETE /auth_store/deleteMap', () => {
    test('check deleteMap', async () => {
        await request(app)
            .post('/auth_store/deleteMap')
            .send(mapId) 
            .expect(200);
    });
})

describe('POST /auth_store/shareMap', () => {
    test('check shareMap', async () => {
        const anotherUser = {
            username: 'Jan Doe', 
            email: 'jan.doe@stonybrook.edu', 
            phone: '1',
            password: '000000000',
            passwordVerify: '000000000'
        }
        
        await request(app)
            .post('/auth_store/register')
            .send(anotherUser)
            .expect(200);

    const shareInfo = {
        mapId: mapId,
        email: 'jan.doe@stonybrook.edu'
    }

    await request(app)
        .post('/auth_store/shareMap')
        .send(shareInfo) 
        .expect(200);
    });
})

describe('POST /auth_store/changeVisibility', () => {
    test('check changeVisibility to private', async () => {
        const sendInfo = {
            mapId: mapId,
            visibility: "private"
        }
        await request(app)
            .post('/auth_store/changeVisibility')
            .send(sendInfo) 
            .expect(200);
    });

    test('check changeVisibility to public', async () => {
        const sendInfo = {
            mapId: mapId,
            visibility: "public"
        }
        await request(app)
            .post('/auth_store/changeVisibility')
            .send(sendInfo) 
            .expect(200);
    });
})

describe('POST /auth_store/searchMap', () => {
    test('check searchMap (searchTerm exist)', async () => {
        await request(app)
            .post('/auth_store/searchMap')
            .send({searchTerm: 'my'}) 
            .expect(200);
    });
    test('check searchMap (searchTerm none)', async () => {
        await request(app)
            .post('/auth_store/searchMap')
            .send({searchTerm: ''}) 
            .expect(200);
    });
})

describe('POST /auth_store/onText', () => {
    test('check onText(blank text)', async () => {
        await request(app)
            .post('/auth_store/onText')
            .send({array: [], mapId}) 
            .expect(200);
    });
    test('check onText(exist text)', async () => {
        await request(app)
            .post('/auth_store/onText')
            .send({array: 'Hello', mapId}) 
            .expect(200);
    });
    test('check onText(non-character)', async () => {
        await request(app)
            .post('/auth_store/onText')
            .send({array: 1, mapId}) 
            .expect(200);
    });
    test('check onText(text change twice)', async () => {
        await request(app)
            .post('/auth_store/onText')
            .send({array: 'Hey', mapId}) 
            .expect(200);
    });
})

describe('POST /auth_store/onColor', () => {
    test('check onColor(unselected color)', async () => {
        await request(app)
            .post('/auth_store/onColor')
            .send({array: ""}) 
            .expect(200);
    });
    test('check onColor(exist color)', async () => {
        await request(app)
            .post('/auth_store/onColor')
            .send({array: "#d92020"}) 
            .expect(200);
    });
    test('check onColor(color change twice)', async () => {
        await request(app)
            .post('/auth_store/onColor')
            .send({array: "#1d1cc9"}) 
            .expect(200);
    });
})

let legendId = ''
describe('POST /auth_store/onLegend', () => {
    test('check onLegend(non-provided legend)', async () => {
        const response = await request(app)
            .post('/auth_store/onLegend')
            .send({array: []}) 
            .expect(200);
        legendId = response.body._id
    });
    test('check onLegend(existing provided legend)', async () => {
        const response = await request(app)
            .post('/auth_store/onLegend')
            .send({array: ["##188c1f", "Mountain"]}) 
            .expect(200);
        legendId = response.body._id
    });
    test('check onLegend(change legend twice)', async () => {
        const response = await request(app)
            .post('/auth_store/onLegend')
            .send({array: ["##188c", "Mountain"]}) 
            .expect(200);
        legendId = response.body._id
    });
})

describe('DELETE /auth_store/deleteLegend', () => {
    test('check delete legend', async () => {
        await request(app)
            .post('/auth_store/deleteLegend')
            .send({legendId, mapId}) 
            .expect(200);
    });
})

afterAll(async () => {
    if (db && db.close) {
        await db.close();
    }
});
