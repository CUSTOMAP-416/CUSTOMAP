const express = require('express')
const authStoreRouter = express.Router()
const AuthStoreController = require('./auth_store_controller')

authStoreRouter.post('/register', AuthStoreController.registerUser)
authStoreRouter.post('/login', AuthStoreController.loginUser)
authStoreRouter.get('/logout', AuthStoreController.logoutUser)
authStoreRouter.get('/loggedIn', AuthStoreController.getLoggedIn)

module.exports = authStoreRouter