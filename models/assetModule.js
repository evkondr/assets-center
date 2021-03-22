const mongoose = require('mongoose');

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
        required: true
    },
    byWho:{
        type: String,
        required: true
    },
    //Modification day
    mDay:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    }
})

const Assets = mongoose.model('Assets', assetsSchema)

module.exports = Assets