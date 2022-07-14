const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
    name:{type:String,required:true},
    detail:{type:String,required:true},
    image:{type:String,required:true},
    price:{type:String,required:true},
    sku:{type:String,required:true},

    tax:{type:String,required:true},
    menu_id:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'menu'},
    category_id:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'category'},
    company_id:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'company'},
    user_id:{type:mongoose.Schema.Types.ObjectId,required:true, ref:'user'}
},{
    timestamps: true,
});

const MenuItem = mongoose.model('menuItem', MenuItemSchema)

module.exports = MenuItem