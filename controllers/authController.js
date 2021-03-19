const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../models/userModel')
// LOGIN CONTROLLER
exports.login = async (req, res) => {
    const user = {...req.body}
    const candidate = await Users.findOne({email: user.email}).exec();
    if(!candidate){
        return res.status(400).send('Bad Request')
    }
    result = await bcrypt.compare(user.password, candidate.password)
    if(!result){
        return res.status(400).send('Bad Request')
    }
    res.status(200).json({candidate})
}
// REGISTER CONTROLLER
exports.register = async (req, res) => {
    try{
        let {email, password} = req.body
        const candidate = await Users.findOne({email}).exec();
        if(candidate){
            return res.status(400).json({'message': "user with this email already exists"})
        }
        const salt = await bcrypt.genSaltSync(10);
        var hash = await bcrypt.hashSync(password, salt);
        const user =  new Users({...req.body, password: hash})
        await user.save()
        res.status(200).json({"user crated": user})
    }catch(e){
        res.status(500).json({"message":e.message})
    }
}

