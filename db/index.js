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
    
    //Map Schema
    const mapSchema = new mongoose.Schema({
        title: { type: String, required: true },
        description: String,
        owner: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
        visibility: { type: String, default: 'private' },
        discussions: [{ type: mongoose.Types.ObjectId, ref: 'Discussion' }],
        legend: [String],
        texts: [{ type: mongoose.Types.ObjectId, ref: 'Text' }],
        colors: [{ type: mongoose.Types.ObjectId, ref: 'Color' }],
        createdDate: { type: Date, default: Date.now },
    });
    const Map = mongoose.model('map', mapSchema);

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

    //getMap
    app.get('/api/map/:owner/:mapid', async(req, res) => {
        const id = new Object(req.params.id)
        const map = await Map.findById(id);
        if (!map) {
            return res.status(404).json({ message: 'Map not found' });
        }
        
        res.status(200).json(map);
    })

    // getAllMaps
    app.get('/api/maps', async (req, res) => {
        const maps = await Map.find();
        res.status(200).json(maps);
    })

    // createMap
    app.post('/api/map', async (req, res) => {
        const { title, owner ,description, legend, texts, colors } = req.body;
        
        const textsArray = texts ? texts.split(',').map(id => mongoose.Types.ObjectId(id.trim())) : [];
        const colorsArray = colors ? colors.split(',').map(id => mongoose.Types.ObjectId(id.trim())) : [];

        const ownerId = new mongoose.Types.ObjectId(owner);
        const mapInfo = {
            title, 
            description,
            owner: ownerId,
            legend,
            texts: textsArray,
            colors: colorsArray,
        };

        const newMap = new Map(mapInfo);
        await newMap.save();
        res.status(201).json(newMap);
    });

    // // updateMap
    // app.put('/api/map/:owner/:mapid', async(req, res) => {
    //     if(!req.params.email){
    //         res.status(404).json({})
    //     }
    //     if(!req.params.id){
    //         res.status(404).json({})
    //     }

    //     const { title, description, owner,visibility, discussions, legend, texts, colors, createdDate } = req.body;
    //     const filter = { _id: new ObjectId(req.params.id) };
    //     const update = { title, description, owner,visibility, discussions, legend, texts, colors, createdDate  };

    //     await Map.findOneAndUpdate(filter, update);
    //     const updatedMap = await Map.findOne(filter);

    //     res.status(200).json(updatedMap);
    //     res.status(200).json()
    // });

    // deleteMap
    app.delete('/api/map/:owner/:mapid ', async(req, res) => {
        if(!req.params.email){
            res.status(404).json({})
        }
        if(!req.params.id){
            res.status(404).json({})
        }

        const filter = { _id: new ObjectId(req.params.id) };

        await Map.findOneAndDelete(filter);
        res.status(200).json({message: "Successfully deleted"});
    })

    // loggedIn
    app.post('/api/users/login', (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const user = User.find(u => u.username === username);
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