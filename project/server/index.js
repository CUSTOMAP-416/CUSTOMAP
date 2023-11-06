// THESE ARE NODE APIs WE WISH TO USE
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
// CREATE OUR SERVER
const PORT = 8080;
const app = express()

// SETUP THE MIDDLEWARE
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

// SETUP OUR OWN ROUTERS AS MIDDLEWARE
const authStoreRouter = require('./auth_store_router')
app.use('/auth_store', authStoreRouter)

// INITIALIZE OUR DATABASE OBJECT
const mongoose = require('mongoose')
const mongoDB = "mongodb://127.0.0.1:27017/customap";
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
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
