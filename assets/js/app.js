const express = require('express')
const app = express()
app.post('/api/reguser', (req, res) => {
    res.send({
        status: "0",
        message: "注册成功"
    })

})
app.listen(80, function () {
    console.log("http://127.0.0.1")
})