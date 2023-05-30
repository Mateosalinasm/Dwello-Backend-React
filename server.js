const express = require('express');
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const cors = require('cors')
const propertiesController = require('./controllers/properties.js')
require('dotenv').config()

const app = express()
const properties = require('./models/properties.js')

const PORT = process.env.PORT || 3003

//Middleware
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(methodOverride('_method'))
app.use('/dwellings', propertiesController)

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => console.log(err.message + ' MongoDB not connected'));
db.on('connected', () => console.log('MongoDB connected'));
db.on('disconnected', () => console.log('MongoDB disconnected'));

app.listen(PORT, () => console.log('Listening on port', PORT));

app.get('/', (req, res) => {
    res.send('Dwello')
})

app.listen(PORT, () => {
    console.log('Listening on port ', PORT)
})