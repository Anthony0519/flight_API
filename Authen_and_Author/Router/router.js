const router = require("express").Router()
const {home, createUser,verifyUser, login, updateUser, logOut} = require("../controller/controller")
const authenticate = require('../middleware/authentication')
router.get("/", home)
router.post("/createuser", createUser)
router.put("/verifyUser/:id/:token", verifyUser)
router.put("/updateuser/:id", authenticate, updateUser)
router.post("/login", login)
router.post("/logout/:id", logOut)

module.exports = router