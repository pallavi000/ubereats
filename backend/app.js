const mongoose = require('mongoose');
const express = require('express')
const cors = require('cors')
const app = express()
const user = require('./routes/user')
const category = require('./routes/category')
const menu = require('./routes/menu')
const menuitem = require('./routes/menuitem')
const company = require('./routes/company')
const frontend = require('./routes/frontend')

const fileUpload = require('express-fileupload')
require('dotenv').config()


try {
    mongoose.connect(process.env.DB_URL,{useNewUrlParser: true, useUnifiedTopology: true,})
} catch(err) {
    console.log(err.message);
}

app.use(cors())

app.use(express.json({limit:'50mb'}))
app.use(fileUpload())



app.use('/api/user',user)
app.use('/api/category',category)
app.use('/api/menu',menu)
app.use('/api/menuitem',menuitem)
app.use('/api/company',company)
app.use('/api/frontend',frontend)

const PORT= process.env.PORT || 5000
app.listen(PORT)