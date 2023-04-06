const mongoose = require('mongoose')
var mongooseTypePhone = require('mongoose-type-phone')
const userSchema = mongoose.Schema({
    name:{
        type: String,
        required:[true,'Please add a name']
    },
    email:{
        type:String,
        required:[true,'Please add a email'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Please add a password']
    },
    phonenumber:{
        type:mongoose.SchemaTypes.Phone
    },
    
},
{
    timestamps:true
})

module.exports = mongoose.model('User',userSchema)