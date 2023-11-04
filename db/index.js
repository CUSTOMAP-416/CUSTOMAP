const express= require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

app.use(
    express.json({
        limit: "50mb",
    })
);

const dbName = 'customap'
const uri = `mongodb://127.0.0.1:27017/${dbName}`;

// FIXME: separate routers and app (possibly separate config files)
async function startServer(){
    //mongo
    try{
        await mongoose.connect(uri);
    }catch(err){
        console.error(err);
        process.exit();
    }
    const ObjectId = mongoose.Types.ObjectId;
    //User Schema
    //FIXME: what is username? (Why is it unique?)
    const userSchema = new mongoose.Schema({
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    });
    const User = mongoose.model('user', userSchema);

    // webpage
    app.get('/', (req, res) => {
        res.status(200).json({
            status: "success",
        });
    });

    // getUser
    app.get('/api/user/:id', async(req, res) => {
        const id = new Object(req.params.id)
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    })

    // getAllUser
    app.get('/api/users', async (req, res) => {
        const users = await User.find();
        res.status(200).json(users);
    })

    // createUser
    app.post('/api/users', async (req, res) => {
        const { username, email, password } = req.body;
        const userInfo = {
            username,
            email,
            password
        }

        if (!email || !username || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required.' });
        }

        const newUser = new User(userInfo);        
        await newUser.save();
        res.status(201).json(newUser);
    })

    // updateUser
    app.put('/api/user/:id', async (req, res) => {
        if(!req.params.id){
            res.status(404).json({})
        }
        const { username, email, password } = req.body; 
        const filter = { _id: new ObjectId(req.params.id) };
        const update = { username, email, password  };

        await User.findOneAndUpdate(filter, update);
        const updatedUser = await User.findOne(filter);
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
        console.log(`
        #######################################################################################
        ##################  Customap Backend listening on port ${port}  ##########################
        #######################################################################################
        `)
    })
}

startServer()

module.exports = app