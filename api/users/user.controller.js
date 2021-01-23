const { create, getUsers, getUserByUserId, updateUserById, deleteUserById } = require('./user.service');
const { hashSync, genSaltSync } = require('bcrypt');

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
    }
}
