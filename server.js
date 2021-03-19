const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');

const config = require('./config')
const authRouter = require('./routes/authRouter')
const assetsRouter = require('./routes/assetsRouter')
//init server
const app = express()
//middlewares
app.use(cors(), express.json())
app.use('/api/auth', authRouter)
app.use('/api/assets', assetsRouter)
async function connectDB(){
    try{
        await mongoose.connect(config.dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
          });
          console.log('DB connected')
    }catch(e){
        console.log(e)
    }
    
}
connectDB()
app.listen(config.port, () =>{
    console.log('app listen on port ' + config.port)
})