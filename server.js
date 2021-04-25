const path = require('path')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');

const config = require('./config')
const authRouter = require('./routes/authRouter')
const assetsRouter = require('./routes/assetsRouter')
const usersRouter = require('./routes/usersRouter')
//init server
const app = express()
//middlewares
app.use(cors(), express.json())
app.use('/api/auth', authRouter)
app.use('/api/assets', assetsRouter)
app.use('/api/users', usersRouter)
if(process.env.NODE_ENV === 'production'){
    app.use('/', express.static(path.resolve(__dirname, 'Client', 'dist')))
    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'Client', 'dist', 'index.html'))
    })
}

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