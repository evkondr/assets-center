const express = require('express')
const cors = require('cors')

const config = require('./config')
const authRouter = require('./routes/authRouter')
const assetsRouter = require('./routes/assetsRouter')
//init server
const app = express()
//middlewares
app.use('/api/auth', authRouter)
app.use('/api/assets', assetsRouter)

app.listen(config.port, () =>{
    console.log('app listen on port ' + config.port)
})