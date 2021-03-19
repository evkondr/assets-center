const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const usersSchema = new Schema({
    email: String,
    password: String,
    name: String,
    surname: String,
    position: String
})

const Users = mongoose.model('Users', usersSchema)

module.exports = Users