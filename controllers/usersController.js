
const Users = require('../models/userModel')

//Get all users
exports.getUsers = async (req, res) => {
    try{
        const result = await Users.find({})
        res.status(200).json({result})
    }catch(e){
        res.status(500).json({message: e.message})
    }
}
//Get one user
exports.getUser = async (req, res) => {
    try{
        const user = await Users.findById(req.params.id)
        if(!user){
            return res.status(404).json({message: `User with id ${req.params.id} didn't find`})
        }
        res.status(200).json({user})
    }catch(e){
        res.status(500).json({message: e.message})
    }
}
//Delete a user
exports.deleteUser = async (req, res) => {
    try{
        const result = await Users.findByIdAndDelete(req.body.id)
        if(!result){
            res.status(404).json({"message":"item did't find"})
        }
        res.status(200).json({"delleted":result}) 
    }catch(e){
        res.status(500).json({message: e.message})
    }
}
//Update a user
exports.updateUser = async (req, res) => {
    try{
        const {name, surname, position} = req.body
        const result = await Users.findByIdAndUpdate(req.body.id, {name, surname, position})
        if(!result){
            res.status(404).json({"message":"item did't find"})
        }
        res.status(200).json({"updated":result}) 
    }catch(e){
        res.status(500).json({message: e.message})
    }
}