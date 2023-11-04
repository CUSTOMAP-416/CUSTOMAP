const express= require('express');
const app = express();

// webpage
app.get('/', (req, res) => {
    res.status(200).json({
        status: "success",
    });
});

// getUser
app.get('/api/user/:id', (req, res) => {
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

module.exports = app; 