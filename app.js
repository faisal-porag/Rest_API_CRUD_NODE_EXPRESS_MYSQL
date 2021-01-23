require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const userRouter = require("./api/users/user.router");
const app = express();

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/api", (req,res)=>{
//     res.json({
//         Successs: 1,
//         Message: "Request success!"
//     });
// });

app.use('/api/users',userRouter);

//Get Value from .env file (process.env.variable name like(APP_PORT) )
app.listen(process.env.APP_PORT,()=>{
    console.log("Server is running on "+process.env.APP_PORT+" port.");
});
