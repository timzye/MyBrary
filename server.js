if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
    //pa poglejmo ce dela
app.set('view engine', 'ejs')
app.set('views', './views')
app.set('layout', 'layout') //we dont need to duplicate header and footers of html files
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded( {limit: '10mb', extended: false} ))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter)
app.use('/authors', authorRouter)

app.listen(process.env.PORT || 3000)