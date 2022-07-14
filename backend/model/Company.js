const mongoose = require('mongoose')
const companySchema = new mongoose.Schema({
    'company_name':{type:String,required:true},
    'address':{type:String,required:true},
    'city':{type:String,required:true},
    'country':{type:String,required:true},
    'postal_code':{type:Number}
  
},{
    timestamps:true
})

const Company = mongoose.model('company',companySchema)
module.exports = Company

