
const router = require('express').Router();
const { 
    createUser, 
    getUsers, 
    getUserById, 
    updateUserInfo, 
    DeleteUserInfo, 
    checkAuthUserByEmail 
} = require('./user.controller');

const { checkValidToken } = require('../../auth/token_validation');

//Access without login
//---------------------------
//router.post("/addUser", checkValidToken, createUser);
//router.get("/getAllUser", getUsers);
//router.post("/getUserById", getUserById);
//router.post("/updateUserInfo", checkValidToken, updateUserInfo);
//router.post("/deleteUser", checkValidToken, DeleteUserInfo);

//Route With Authentication (Access with login)
//-------------------------------------------------
router.post("/addUser", createUser);
router.get("/getAllUser", getUsers);
router.post("/getUserById", getUserById);
router.post("/updateUserInfo", updateUserInfo);
router.post("/deleteUser", DeleteUserInfo);

//Login Route
router.post("/login", checkAuthUserByEmail);

module.exports = router;
