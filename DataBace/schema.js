const mongoose = require('mongoose')



const userSchema =mongoose.Schema({
    name:{
        type: String,
        rquired:true,
        minLenght:4,
        maxLength:30
    } ,
    email: String,
    password :String,
    verifiedEmail: Boolean,
        block: {type:Boolean, default:false},
        attempts:{ type: Number,  default: 0 },
        lasLoginTime:Number

},{
    timestamp:true
})

const userModel = mongoose.model("userModel", userSchema)
module.exports =userModel;