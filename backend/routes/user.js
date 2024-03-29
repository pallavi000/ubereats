const { Router } = require('express');
const router = Router(); 
const User = require('../model/User') 
const Company = require('../model/Company')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

// Get all users
router.get('/', auth,async(req, res) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch (error) {
        res.status(500).send(error.message)
    }
})


// Create a new user
router.post('/register', async(req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password,salt)

        let user = new User({
            'name':req.body.name,
            'email':req.body.email,
            'password':hashPassword,
            'phone':req.body.phone,
        })

        user = await user.save()
        res.send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})


// Create a new user
router.post('/company/register', async(req, res) => {
    try {
        console.log(req.body)
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password,salt)

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

        let company = new Company({
            company_name:req.body.company_name,
            address : req.body.address,
            city : req.body.city,
            country : req.body.country,
            postal_code:req.body.postal_code,
            image:picture
        })
        company = await company.save()

        let user = new User({
            'name':req.body.name,
            'email':req.body.email,
            'password':hashPassword,
            'phone':req.body.phone,
            company_id:company._id,
            role : 'company'
        })

        user = await user.save()
        res.send({user,company})
    } catch (error) {
        res.status(500).send(error.message)
    }
})



router.post('/login',async(req,res)=>{
    try {
        const user = await User.findOne({email:req.body.email})
        console.log(user)
        if(user){
            const valid = await bcrypt.compare(req.body.password,user.password)  
            if(valid){
               
                var token = await jwt.sign({ _id: user._id,email:user.email,role:user.role,company_id:user.company_id }, process.env.SECRET_KEY);
                console.log(token)
                res.json({token:token,user:user})
                
            }else{
                res.status(400).json('login failed!Invalid Password')
            }
        }else{
            res.status(404).json('user not found')
        }
        
    } catch (error) {
        res.status(500).send(error.message)
    }
})


// Get user By ID
router.get('/:id',auth, async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Update user By ID
router.put('/:id', auth, async(req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id,{
            name:req.body.name,
            email:req.body.email
        },{new:true})
        res.json(user)  
    } catch (error) {
        res.status(500).json(error.message)
    }
})


// Delete user By ID
router.delete('/:id',auth, async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        res.send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})



router.post('/change-password',auth,async(req,res)=>{
    try {
        if(req.body.newpassword!=req.body.confirmpassword){
            return res.status(400).send('password did not match')
        }

        let user = await User.findById(req.user._id)
        if(!user){
            return res.status(404).send('user not found')
        }
      
        var valid = await bcrypt.compare(req.body.currentpassword,user.password)
        if(!valid){
            return res.status(400).send('Invalid password')
        }

        
        var salt = await bcrypt.genSalt(10)
        var hashPassword =await bcrypt.hash(req.body.newpassword,salt)
        user.password = hashPassword
        await user.save()
        res.send('Password has been changed')
        
        
        
    } catch (error) {
        res.status(500).send(error.message)
    }
})
module.exports = router