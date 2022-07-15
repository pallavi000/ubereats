const mongoose = require('mongoose')
const categorySchema = new mongoose.Schema({
    'name':{type:String,required:true},
    'slug':{type:String,required:true},
    'company_id':{type:mongoose.Schema.Types.ObjectId,ref:'company'}
},{
    timestamps:true
})

const Category = mongoose.model('category',categorySchema)
module.exports =Category