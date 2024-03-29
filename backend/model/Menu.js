const mongoose = require('mongoose')
const menuSchema = new mongoose.Schema({
    'name':{type:String,required:true},
    'slug':{type:String,required:true},
    company_id:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'company'}
},{
    timestamps:true
})

const Menu = mongoose.model('menu',menuSchema)
module.exports =Menu