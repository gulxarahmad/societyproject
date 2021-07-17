const bcrypt = require('bcryptjs')
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
    type:String,
     required:true
    }


},
{
    timestamps:true
});
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    else{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }    
    
});

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

const signUpUser = mongoose.model('User',userSchema);

module.exports = signUpUser;
