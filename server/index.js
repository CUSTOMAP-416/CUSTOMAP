// THESE ARE NODE APIs WE WISH TO USE
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
// CREATE OUR SERVER
const PORT = process.env.PORT || 8080;
const app = express()

// SETUP THE MIDDLEWARE
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
    origin: ["http://localhost:3000", "https://customap416client-3b33f67d5c86.herokuapp.com"],
    credentials: true
}))
app.use(cookieParser())
const session = require("express-session");
app.use(session({
    secret: "secret to sign session cookie",
    cookie: {},
    resave: false,
    saveUninitialized: false,
}))

// SETUP OUR OWN ROUTERS AS MIDDLEWARE
const authStoreRouter = require('./auth_store_router')
app.use('/auth_store', authStoreRouter)

// INITIALIZE OUR DATABASE OBJECT
const mongoose = require('mongoose')
const mongoDB = "mongodb+srv://shihaowen:customap@cluster0.qw90kmw.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// PUT THE SERVER IN LISTENING MODE
const server = app.listen(PORT, () => console.log('Server running on port '+PORT))
process.on('SIGINT', () => {
    server.close(() => {
      console.log('\nServer closed')
    })
    if(db) {
      db.close()
        .then(() => console.log('Database instance disconnected'))
        .catch((err) => console.log(err));
    }
  })
module.exports = {
  app,
  db
}
