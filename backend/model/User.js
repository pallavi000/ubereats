const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    'name':{type:String,required:true},
    'email':{type:String,required:true,unique:true},
    'password':{type:String,required:true},
    'role':{type:String,default:'user'},
    'company_id':{type:String},
    'phone':{type:Number}

},{
    timestamps:true
})

const User = mongoose.model('user',userSchema)
module.exports = User