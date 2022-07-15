const { Router } = require('express');
const router = Router(); 
const Company = require('../model/Company') 
const Authorization = require('../middleware/companyAuth')

// Get all companys
router.get('/',async(req, res) => {
    try {
        const companys = await Company.find()
        res.send(companys)
    } catch (error) {
        res.status(500).send(error.message)
    }
})


// Get company By ID
router.get('/:id', async(req, res) => {
    try {
        const company = await Company.findById(req.params.id)
        res.send(company)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Update company By ID
router.put('/:id', Authorization, async(req, res) => {
    try {

        if(req.files.image){
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
            return  res.status(500).send(is_error)
           }
           company.image= picture
        }


        const company = await Company.findByIdAndUpdate(req.params.id, {
            company_name : req.body.company_name,
            address : req.body.address,
            city:req.body.city,
            country:req.body.country
        },{new: true})
        res.send(company)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Delete company By ID
router.delete('/:id', Authorization, async(req, res) => {
    try {
        const company = await Company.findByIdAndDelete(req.params.id)
        res.send(company)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router