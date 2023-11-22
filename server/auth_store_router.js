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
authStoreRouter.post("/getMap", AuthStoreController.getMap)
authStoreRouter.post("/editMap", AuthStoreController.editMap)
authStoreRouter.post("/forkMap", AuthStoreController.forkMap)
authStoreRouter.post("/deleteMap", AuthStoreController.deleteMap)
authStoreRouter.post("/shareMap", AuthStoreController.shareMap)
authStoreRouter.post("/changeVisibility", AuthStoreController.changeVisibility)
authStoreRouter.post("/searchMap", AuthStoreController.searchMap)

module.exports = authStoreRouter
