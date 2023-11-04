const express= require('express');
const { MongoClient } = require("mongodb");

const app = express();
const port = 3000;

const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'customap'
let client;

async function startServer(){
    //mongo
    try{
        client = new MongoClient(uri);
        await client.connect();
    }catch(err){
        console.error(err);
        process.exit();
    }
    const db = client.db(dbName);

    // webpage
    app.get('/', (req, res) => {
        res.status(200).json({
            status: "success",
        });
    });

    // getUser
    app.get('/api/user/:id', (req, res) => {
        const {id} = req.params

        res.status(200).json({ message: 'Success' });
    })

    // getAllUser
    app.get('/api/users', (req, res) => {
        res.status(200).json({ message: 'Success' });
    })

    // createUser
    app.post('/api/users', (req, res) => {
        const { name, phone, email, password } = req.body;

        if (!email || !name || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required.' });
        }

        const newUser = {name: 'John Doe', 
                        phone: '631-XXX-XXXX', 
                        id: 'johndoe000', 
                        email: 'john.doe@stonybrook.edu', 
                        password: '0000'}

        users.push(newUser);
        res.status(201).json(newUser);
    })

    // updateUser
    app.put('/api/user/:id', (req, res) => {
        if(!req.params.id){
            res.status(404).json({})
        }
        //const { name, phone, email, password } = req.body; 
        
        //temp
        const name= 'Jane Doe'
        const phone= '631-YYY-YYYY'
        const password= '1234'

        const updatedUser = {
            name: name, 
            phone: phone, 
            password: password}

        res.status(201).json(updatedUser);
    });

    // getMap
    app.get('/api/map/:email/:id', (req, res) => {
        res.status(200).json({ message: 'Success' });
    })

    // getAllMaps
    app.get('/api/maps', (req, res) => {
        res.status(200).json({ message: 'Success' });
    })

    // createMap
    app.post('/api/map', (req, res) => {
        const { email, name, chat, file, font, color, legend } = req.body;
        if (!file) {
            return res.status(400).json({ message: 'File is required.' });
        }
        const newMap = {
            name: name || 'myMap', 
            chat: [{}], 
            file: file || {},
            font: font || '',
            color: color || {},
            legend: legend || ''
        };

        res.status(201).json(newMap);
    });

    // updateMap
    app.put('/api/map/:email/:id', (req, res) => {
        if(!req.params.email){
            res.status(404).json({})
        }
        if(!req.params.id){
            res.status(404).json({})
        }

        //const { email, name, chat, file, font, color, legend } = req.body;

        //temp
        const name= 'Updated Test Map';
        const chat= []
        const file= {}
        const font= 'Arial'
        const color= {}
        const legend= 'Updated legend'

        const updatedMap = {
            id: req.params.id,
            name: name,
            chat: chat, 
            file: file,
            font: font,
            color: color,
            legend: legend
        };

        res.status(200).json(updatedMap);
    });

    // deleteMap
    app.delete('/api/map/:email/:id ', (req, res) => {
        if(!req.params.email){
            res.status(404).json({})
        }
        if(!req.params.id){
            res.status(404).json({})
        }

        const {file} = req.body;
        const mapId = req.params.id;
        if (!file) {
            return res.status(400).json({ message: 'File is required.' });
        }
        res.status(200).json({ message: 'File is required.' });
    })

    // loggedIn
    app.post('/api/users/login', (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const user = users.find(u => u.username === username);
        if (user && user.password === password) {
            return res.status(200).json({
                message: 'Login successful',
            });
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    });

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

startServer()

module.exports = app