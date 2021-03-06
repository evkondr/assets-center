const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const Users = require('../models/userModel')
const config = require('../config')
// LOGIN CONTROLLER
exports.login = async (req, res) => {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                errors: errors.array(),
                message: 'incorrect data entered'
            });
        }
        
        let {email, password} = req.body
        const candidate = await Users.findOne({email}).exec();
        if(!candidate){
            return res.status(400).json({message:'Wrong credentials'})
        }
        result = await bcrypt.compare(password, candidate.password)
        if(!result){
            return res.status(400).json({message:'Wrong credentials'})
        }
        const token = jwt.sign({
            id: candidate._id,
            email: candidate.email
          }, config.jwtsk, { expiresIn: 60 * 60});
        res.status(200).json({token, userId: candidate._id})
    }catch(e){
        res.status(500).json({"message":e.message})
    }
}
// REGISTER CONTROLLER
exports.register = async (req, res) => {
    
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'incorrect data entered'
            });
        }
        
        const user = {...req.body}
        const candidate = await Users.findOne({email: user.email}).exec();
        if(candidate){
            return res.status(400).json({message: "user with this email already exists"})
        }
        const salt = await bcrypt.genSaltSync(10);
        let hash = await bcrypt.hashSync(user.password, salt);
        const newUser =  new Users({...req.body, password: hash})
        await newUser.save()
        res.status(200).json({"user crated": newUser})
    }catch(e){
        res.status(500).json({message:e.message})
    }
}

