const { Router } = require('express');
const router = Router(); 
const Menu = require('../model/Menu') 
const Authorization = require('../middleware/companyAuth')

// Get all menus
router.get('/', Authorization, async(req, res) => {
    try {
        const menus = await Menu.find({'company_id':req.user.company_id}).sort('-_id')
        res.send(menus)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Create a new menu
router.post('/', Authorization, async(req, res) => {
    try {
        let menu = new Menu({
            name:req.body.name,
            slug:req.body.name.replace(' ','-').toLowerCase(),
            company_id:req.user.company_id

        })
        menu = await menu.save()
        res.send(menu)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Get menu By ID
router.get('/:id', Authorization, async(req, res) => {
    try {
        const menu = await Menu.findById(req.params.id)
        res.send(menu)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Update menu By ID
router.put('/:id', Authorization, async(req, res) => {
    try {
        const menu = await Menu.findByIdAndUpdate(req.params.id, {
            name:req.body.name,
            slug:req.body.name.replace(' ','-').toLowerCase(),
            company_id:req.user.company_id

        },{new: true})
        res.send(menu)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Delete menu By ID
router.delete('/:id', Authorization, async(req, res) => {
    try {
        const menu = await Menu.findByIdAndDelete(req.params.id)
        res.send(menu)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router