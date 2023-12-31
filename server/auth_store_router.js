const express = require('express')
const authStoreRouter = express.Router()
const AuthStoreController = require('./auth_store_controller')

authStoreRouter.get("/users", AuthStoreController.getAllusers);
authStoreRouter.get("/maps", AuthStoreController.getAllmaps);
authStoreRouter.post('/register', AuthStoreController.registerUser)
authStoreRouter.post('/login', AuthStoreController.loginUser)
authStoreRouter.get('/session', AuthStoreController.session)
authStoreRouter.get('/logout', AuthStoreController.logoutUser)
authStoreRouter.get('/loggedIn', AuthStoreController.getLoggedIn)
authStoreRouter.post("/forgetPassword", AuthStoreController.forgetPassword)
authStoreRouter.put("/Dashboard/:email", AuthStoreController.editUserInfo);
authStoreRouter.post("/Dashboard/:email", AuthStoreController.deleteUser);
authStoreRouter.post("/createMap", AuthStoreController.createMap)
authStoreRouter.post("/getMap", AuthStoreController.getMap)
authStoreRouter.post("/editMap", AuthStoreController.editMap)
authStoreRouter.post("/forkMap", AuthStoreController.forkMap)
authStoreRouter.post("/deleteMap", AuthStoreController.deleteMap)
authStoreRouter.post("/shareMap", AuthStoreController.shareMap)
authStoreRouter.post("/changeVisibility", AuthStoreController.changeVisibility)
authStoreRouter.post("/searchMap", AuthStoreController.searchMap)
authStoreRouter.post("/onText", AuthStoreController.onText)
authStoreRouter.post("/onColor", AuthStoreController.onColor)
authStoreRouter.post("/onLegend", AuthStoreController.onLegend)
authStoreRouter.post("/deleteLegend", AuthStoreController.deleteLegend)
authStoreRouter.post("/discussion", AuthStoreController.onDiscussion)
authStoreRouter.post("/onFont", AuthStoreController.onFont)
authStoreRouter.post("/onBackgroundColor", AuthStoreController.onBackgroundColor)
authStoreRouter.post("/onCustom", AuthStoreController.onCustom)
authStoreRouter.post("/onThematicLegends", AuthStoreController.onThematicLegends)

module.exports = authStoreRouter
