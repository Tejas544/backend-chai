import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const userSchema = new mongoose.Schema({
    userName : {
        type : String, 
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        index : true
    },
    email : {
        type : String, 
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        
    },
    fullName : {
        type : String, 
        required : true,
        lowercase : true,
        index:true,
        
    },
    avatar:{
        type:String,
        required: true
    },
    coverImage: {
        type:String
    },
    watchHistory :[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    password: {
        type: String,
        required : [true , 'Password is required']
    },
    refreshToken :{
        type : String
    }
} ,{timestamps})
//JWT is an bearer , it is like key
// Save ya fir kis aur chiz ke pehle karna hai woh 1st param , then ek call back fn jo function keyword se hi likha jayega
userSchema.pre("save" , async function(next) {
    if(!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hash(this.password , 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password , this.password);
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '1h'
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            email : this.email,
            username : this.userName,
            fullName : this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '1h'
        }
    )
}

export const User = mongoose.model("User" , userSchema);