//asset db schema 
const mongoose = require('mongoose');

const currentDate = require('../utils/currentDate')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const assetsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    serialNumber:{
        type: String,
        required: true,
        unique: true
    },
    //Creation day
    cDay: {
        type: String,
        default: currentDate
    },
    byWho:{
        type: String,
        required: true
    },
    //Modification day
    mDay:{
        type: String,
        default: currentDate
    },
    department:{
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    owner: {
        type: String 
    },
    comments: {
        type: String,
    }
})

const Assets = mongoose.model('Assets', assetsSchema)

module.exports = Assets