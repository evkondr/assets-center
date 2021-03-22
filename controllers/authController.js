const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../models/userModel')
// LOGIN CONTROLLER
exports.login = async (req, res) => {
    try{
        let {email, password} = req.body
        const candidate = await Users.findOne({email}).exec();
        if(!candidate){
            return res.status(400).json({massage:'Wrong credentials'})
        }
        result = await bcrypt.compare(password, candidate.password)
        if(!result){
            return res.status(400).json({massage:'Wrong credentials'})
        }
        const token = jwt.sign({
            id: candidate._id,
            email: candidate.email
          }, 'secret', { expiresIn: 60 * 60 });
        res.status(200).json({token})
    }catch(e){
        res.status(500).json({"message":e.message})
    }
}
// REGISTER CONTROLLER
exports.register = async (req, res) => {
    try{
        const user = {...req.body}
        const candidate = await Users.findOne({email: user.email}).exec();
        if(candidate){
            return res.status(400).json({'message': "user with this email already exists"})
        }
        const salt = await bcrypt.genSaltSync(10);
        var hash = await bcrypt.hashSync(user.password, salt);
        const newUser =  new Users({...req.body, password: hash})
        await newUser.save()
        res.status(200).json({"user crated": newUser})
    }catch(e){
        res.status(500).json({"message":e.message})
    }
}

