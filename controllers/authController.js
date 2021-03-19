const bcrypt = require('bcryptjs');

const Users = require('../models/userModel')

exports.login = async (req, res) => {
    
    res.status(200).json({"message":"from Login"})
}

exports.register = async (req, res) => {
    try{
        const user = {...req.body}
        const candidate = await Users.findOne({email: user.email}).exec();
        if(candidate){
            return res.status(400).json({'message': "user with this email already exists"})
        }
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
                user.password = hash
            });
        });
        await new Users(user).save()
        res.status(200).json({"user crated": user})
    }catch(e){
        res.status(500).json({"message":e.message})
    }
}

