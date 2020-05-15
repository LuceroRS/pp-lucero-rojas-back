//Dependencias
const express = require('express')
let app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const cors = require('cors')
app.use(cors())

//Base de Datos
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/UsersDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


//EndPoints
const route_user = require('./Routes/UserRoute')
app.use(route_user)

app.listen(8080, () => {
    console.log('SERVIDOR FUNCIONANDO')
})