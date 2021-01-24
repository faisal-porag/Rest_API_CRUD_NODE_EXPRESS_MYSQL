const { verify } = require('jsonwebtoken');

module.exports = {
    checkValidToken: (req, res, next)=>{
        let token = req.get('authorization');
        if(token){
            token = token.slice(7);
            verify(token, process.env.Auth_Secret_Key, (err, decoded)=>{
                if(err){
                    return res.json({
                        success: 0,
                        message: "Invalid token"
                    });  
                }else{
                    next();
                }
            });
        }else{
            return res.json({
                success: 0,
                message: "Access denied! Unauthorized user indentify."
            });
        }
    }
}
