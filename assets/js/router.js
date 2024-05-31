const express = require("express")
const router = express.Router()
router.post("/reguset", (req, res) => {
    const body = req.body
    console.log(body)
    res.send({
        status: 0,
        message: "注册成功",
        data: body
    })
})
router.post('/login', (req, res) => {
    const body = req.body
    res.send({
        status: 0,
        msg: '登录成功',
        data: body
    })
})
module.exports = router