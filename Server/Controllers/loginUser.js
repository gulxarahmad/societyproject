const asyncHandler = require('express-async-handler');
const User = require('../Models/signUpdata');
const generateToken = require('../utils/generateToken');


const loginUser = asyncHandler(async(req,res)=>{

   const email = req.body.email;
   const password = req.body.password;
   const user = await User.findOne({email});

   //res.send(user);

   if(user && (await user.matchPassword(password))){
    //res.send('Yayyyy')  
    res.send({
        id:user._id,
        token:generateToken(user._id),
        name:user.name,
        email:user.email,
        password:user.password
    })
   }
   else{
       throw new Error('Invalid email and password')
   }
   
})

module.exports = loginUser