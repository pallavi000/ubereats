const express = require('express')
const CompanyAuth = require('../middleware/companyAuth')
const Category = require('../model/Category')
const Menu = require('../model/Menu')
const MenuItem = require('../model/MenuItem')
const router = express.Router()


router.get('/menu-item/:id',async(req,res)=>{
    try {
        const menuitems = await MenuItem.find({'company_id':req.params.id}).sort('-_id')
        const categories = await Category.find({'company_id':req.params.id}).sort('-_id')
        const menues = await Menu.find({'company_id':req.params.id}).sort('-_id')
        res.send({menuitems,categories,menues})      
    } catch (error) {
        res.status(500).send(error.message)
    }

})

router.post('/filter',async(req,res)=>{
    try {
        let items;
        if(req.body.category_id && req.body.menu_id ){
            items = await MenuItem.find({'category_id':req.body.category_id,'menu_id':req.body.menu_id})
        }else if(req.body.category_id){
            items = await MenuItem.find({'category_id':req.body.category_id})
        }else if(req.body.menu_id){
            items = await MenuItem.find({'menu_id':req.body.menu_id})

        }else{
            items = await MenuItem.find({'company_id':req.body.company_id})
  
        }

        
        res.send(items)
    } catch (error) {
        res.send(error.message)
    }
})


module.exports = router