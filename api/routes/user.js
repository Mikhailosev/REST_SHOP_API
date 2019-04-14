const express = require("express");
const router = express.Router();
require("dotenv").config();
const checkAuth=require('../auth/check-auth')

const User = require("../models/user");
const UserController=require('../controllers/user')
router.post("/login",UserController.user_login );
router.post("/signup", UserController.user_signup);
router.delete("/:userId",checkAuth, UserController.user_delete);
module.exports = router;
