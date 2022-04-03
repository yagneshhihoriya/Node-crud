const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan');
const appRoutes = require('./routes');
const cors = require('cors')
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use(cors({
    origin: '*',
    allowedHeaders: '*',
    exposedHeaders: '*'
}))

app.use('/', appRoutes)

app.use('/', (_, res) => {
    return res.status(404).json({
        status: 404,
        message: "resource not found"
    })
})
app.listen(port, console.log(`server is running on ${port}`))
