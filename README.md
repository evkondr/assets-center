# assets-center
The App for storing information of all company devices
Befor using the App:
1) Create into app root folder '/' config.js file
2) Create Mongo DB on https://cloud.mongodb.com/
3) Use next schema for config.js:
    module.exports = {
        port: 'Your port number (int)',
        dbURI: 'mongodb+srv://user:password@cluster0.akizf.mongodb.net/dbname',
        jwtsk: 'Your secret key'
    }