const { Router } = require('express');
const router = Router(); 
const Category = require('../model/Category') 
const Authorization = require('../middleware/companyAuth')

// Get all categorys
router.get('/', Authorization, async(req, res) => {
    try {
        const categorys = await Category.find({'company_id':req.user.company_id}).sort('-_id')
        res.send(categorys)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Create a new category
router.post('/', Authorization, async(req, res) => {
    try {
        let category = new Category({
            name:req.body.name,
            slug:req.body.name.replace(' ','-').toLowerCase(),
            company_id:req.user.company_id
        })
        category = await category.save()
        res.send(category)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Get category By ID
router.get('/:id', Authorization, async(req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        res.send(category)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Update category By ID
router.put('/:id', Authorization, async(req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, {
            name:req.body.name,
            slug:req.body.name.replace(' ','-').toLowerCase(),
            company_id:req.user.company_id
        },{new: true})
        res.send(category)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Delete category By ID
router.delete('/:id', Authorization, async(req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id)
        res.send(category)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router