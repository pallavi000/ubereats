const { Router } = require('express');
const router = Router(); 
const Menuitem = require('../model/MenuItem') 
const Category = require('../model/Category') 
const Menu= require('../model/Menu') 
const Authorization = require('../middleware/companyAuth')

// Get all menuitems
router.get('/', Authorization, async(req, res) => {
    try {
        const menuitems = await Menuitem.find().populate(['company_id','category_id','menu_id'])
        res.send(menuitems)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/elements',Authorization,async(req,res)=>{
    try {
        const category = await  Category.find()
        const menu = await Menu.find()
        res.send({category,menu})
        
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Create a new menuitem
router.post('/', Authorization, async(req, res) => {
    try {
        let picture=''
        if(req.files.image){
            const image = req.files.image
            console.log(image)
           var r= Math.random()
            r= r.toString().replace('.','-')
            var is_error= false
            const imageName = new Date().getDate()+r+'.'+image.name.split('.').pop()

             picture = '/assets/images/'+imageName
            const uploadPath = process.env.IMAGE_UPLOAD_PATH+"/"+imageName

           image.mv(uploadPath,(error)=>{
            is_error= error
           })
           if(is_error){
            return  res.status(500).send(is_error)
           }
        }

        let menuitem = new Menuitem({
           name:req.body.name,
           detail:req.body.detail,
           price:req.body.price,
           sku:req.body.sku,
           tax:req.body.tax,
           menu_id:req.body.menu_id,
           category_id:req.body.category_id,
           company_id:req.user.company_id,
           menu_id:req.body.menu_id,
           user_id:req.user._id,
           image:picture
        })
        menuitem = await menuitem.save()
        res.send(menuitem)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Get menuitem By ID
router.get('/:id', Authorization, async(req, res) => {
    try {
        const menuitem = await Menuitem.findById(req.params.id)
        res.send(menuitem)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Update menuitem By ID
router.put('/:id', Authorization, async(req, res) => {
    try {

        const menuitem =await  Menuitem.findById(req.params.id)

        if(req.files && req.files.image){
            const image = req.files.image
            console.log(image)
           var r= Math.random()
            r= r.toString().replace('.','-')
            var is_error= false
            const imageName = new Date().getDate()+r+'.'+image.name.split('.').pop()

            var picture = '/assets/images/'+imageName
            const uploadPath = process.env.IMAGE_UPLOAD_PATH+"/"+imageName

           image.mv(uploadPath,(error)=>{
            is_error= error
           })
           if(is_error){
            return  res.status(500).json(is_error)
           }

           menuitem.image=picture
        }
            menuitem.name=req.body.name,
            menuitem.detail=req.body.detail,
            menuitem.price=req.body.price,
            menuitem.sku=req.body.sku,
            menuitem.tax=req.body.tax,
            menuitem.menu_id=req.body.menu_id,
            menuitem.category_id=req.body.category_id,
            menuitem.company_id=req.user.company_id,
            menuitem.menu_id=req.body.menu_id
            menuitem.user_id = req.user._id

            await menuitem.save()
        res.send(menuitem)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Delete menuitem By ID
router.delete('/:id', Authorization, async(req, res) => {
    try {
        const menuitem = await Menuitem.findByIdAndDelete(req.params.id)
        res.send(menuitem)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router