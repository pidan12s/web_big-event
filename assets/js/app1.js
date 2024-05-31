const express = require("express")
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.urlencoded({
    extended: false
}))
const myRouter = require("./router")
app.use('/api', myRouter)
app.listen(80, function () {
    console.log('http://127.0.0.1')
})