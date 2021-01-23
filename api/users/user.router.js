
const router = require('express').Router();
const { createUser, getUsers, getUserById, updateUserInfo, DeleteUserInfo } = require('./user.controller');


router.post("/", createUser);
router.get("/", getUsers);
router.post("/getUserById", getUserById);
router.post("/updateUserInfo", updateUserInfo);
router.post("/deleteUser", DeleteUserInfo);



module.exports = router;
