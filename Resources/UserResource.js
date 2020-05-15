const UserModel = require('../Models/UserModule')

module.exports = {
    SetUser,
    GetUsers,
    DeleteUser,
    ReportUsers
}

function SetUser(req, res) {

    let user_model = new UserModel({
        nombre: req.body.nombre,
        telefono: req.body.telefono,
        edad: req.body.edad,
        genero: req.body.genero
    })

    user_model.save((err, user_model) => {

        if(err)
            return res.status(400).send('Error al agregar usuario')
        
        res.send(user_model)
    })
}

function GetUsers(req, res) {

    const name_send = req.query.nombre

    let state = {}

    if(name_send && name_send != '')
        state = {
            nombre: name_send
        }

    UserModel.find(state).exec((err, users) => {

        if(err)
            return res.send('error al consultar los datos')

        return res.send(users)
    })
}

function DeleteUser(req, res) {

    const user_id = req.params.usuario_id

    UserModel.deleteOne({ _id: user_id }).exec((err, resp) => {

        if(err)
            return res.send('Error al borrar al usuario')

        return res.send({
            success: 'Todo correcto'
        })
    })
}

function ReportUsers(req, res) {

    let ReferenceDate = new Date()
        ReferenceDate.setDate(ReferenceDate.getDate() - 3)

    const states = {
        edad: { $gte: 18 },
        genero: { $eq: 'Masculino' },
        fecha: { $gte: ReferenceDate }
    }

    UserModel
        .find(states)
        .select({
            _id: false,
            nombre: true,
            telefono: true,
        })
        .exec((err, users) => {

        if(err)
            return res.send('Error al consultar  los usuario')

        return res.send(users)
    })
}