const express = require('express')
let router = express.Router()

const user_resource = require('../Resources/UserResource')

//Crear Usuario
router.post('/user', user_resource.SetUser)

//Obtener Usuario (Nombre)
router.get('/users', user_resource.GetUsers)


router.get('/users/report', user_resource.ReportUsers)

//Borrar Usuario
router.delete('/user/:usuario_id', user_resource.DeleteUser)

module.exports = router