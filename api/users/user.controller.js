const { 
    create, 
    getUsers, 
    getUserByUserId, 
    updateUserById, 
    deleteUserById,
    userAuthenticationByEmail
} = require('./user.service');

const { 
    hashSync, 
    genSaltSync,
    compareSync
} = require('bcrypt');

const { sign } = require('jsonwebtoken');

const dbErrMsg = "System can not deal your request at this time.Please try after some times..";

module.exports = {
    createUser: (req, res) =>{
        const body = req.body;
        //console.log(body);
        //Encript technique
        //Need to install bcrypt for genSaltSync and hashSync
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);

        //console.log(body.password)

        create(body, (err, results) =>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message: dbErrMsg
                });
            }
            return res.status(200).json({
                success:1,
                message: "Information added successfully!",
                data: results
            });
        });
    },

    getUsers: (req, res) => {
        getUsers((err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message: dbErrMsg
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getUserById: (req, res) => {
        const body = req.body;
        getUserByUserId(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message: dbErrMsg
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    updateUserInfo: (req, res)=>{
        const body = req.body;
        updateUserById(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message: dbErrMsg
                });
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "Failed to update process!"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Information updated successfully!"
            });
        });
    },

    DeleteUserInfo: (req, res)=>{
        const body = req.body;
        deleteUserById(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success:0,
                    message: dbErrMsg
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Information deleted successfully!"
            });
        });
    },

    checkAuthUserByEmail: (req, res)=>{
        const body = req.body;
        const strEmail = body.email;
        userAuthenticationByEmail(strEmail, (err, results)=>{
            if(err) {
                console.log(err);
                return res.json({
                    success:0,
                    message: dbErrMsg
                });
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "Invalid Email or Password!"
                });
            }
            const checkData = compareSync(body.password, results.password);
            if(checkData){
                body.password = undefined;
                const strJsonToken = sign({ result: results }, process.env.Auth_Secret_Key, {
                    expiresIn: "1h"
                });
                return res.json({
                    success: 1,
                    message: "Login succesfully.",
                    token: strJsonToken
                });
            }else{
                return res.json({
                    success: 0,
                    message: "Invalid Email or Password!"
                });
            }
        });
    }
}
