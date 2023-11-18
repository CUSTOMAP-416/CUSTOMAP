const express = require('express')
const authStoreRouter = express.Router()
const AuthStoreController = require('./auth_store_controller')

authStoreRouter.post('/register', AuthStoreController.registerUser)
authStoreRouter.post('/login', AuthStoreController.loginUser)
authStoreRouter.get('/logout', AuthStoreController.logoutUser)
authStoreRouter.get('/loggedIn', AuthStoreController.getLoggedIn)
authStoreRouter.post("/forgetPassword", AuthStoreController.forgetPassword)
authStoreRouter.put("/Dashboard/:email", AuthStoreController.editUserInfo);
authStoreRouter.post("/createMap", AuthStoreController.createMap)


module.exports = authStoreRouter
