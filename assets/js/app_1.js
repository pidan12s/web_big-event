//  不验证版本
const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())
// 配置jwt

const jwt = require("jsonwebtoken")
const expressJWT = require("express-jwt")
const secretKey = 'it is so easy'
//  04:  注册将jwt 字符串 解析还原成json对象的中间件
//注意 之哟啊配置成功了 express-jwt这个中间件 就可以将解析出来的用户信息挂载到 req.user属性上
//  允许跨域资源共享
app.use(expressJWT({
    secret: secretKey
}).unless({
    path: [/^\/api\//]
}))



app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // 或者指定特定的域名 "http://www.example.com"
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
// 解析 post 请求提交过来的数据
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({
    extended: false
}))
// 解析 get请求数据
app.use(express.json())
// 注册请求
app.post('/api/reguest', (req, res) => {
    const body = req.body
    res.send({
        status: 0,
        msg: '注册成功',
        data: body
    })
})
//  登录请求
app.post("/api/login", (req, res) => {
    const userinfo = req.body
    userinfo.user_pic = '../images/sample.jpg'

    // if (userinfo.username !== 'admin' || userinfo.password !== '000000') {
    //     // userinfo.user_pic = '../images/sample.jpg'
    //     res.send({
    //         status: 0,
    //         msg: "登录失败",
    //         data: userinfo

    //     })
    // }
    // 登录成功
    //  03： 登录成功之后， 调用jwt.sign()方法生成jwt字符串
    // 并通过 token 属性发送给客户端
    //  参数1 ： 用户的信息对象
    // 参数2： 加密的密钥
    // 参数3： 配置对象， 可以配置当前token的有效期，
    // 记住 千万不要把密码加密到 token字符中
    const tokenStr = jwt.sign({
        username: userinfo.username,
    }, secretKey, {
        expiresIn: '24h'
    })
    res.send({
        status: 0,
        msg: "登录成功",
        data: userinfo,
        token: tokenStr
    })
})
// 获取用户信息 这是一个有权限的api 接口
app.get("/my/userinfo", (req, res) => {
    res.setHeader("Access-Control-Allow-Headers", "*")
    req.user.nickname = ''
    // req.user.user_pic = '../bigevent/assets/images/sample2.jpg'
    req.user.user_pic = ''
    req.user.email = ''
    req.user.password = ''
    console.log(req.user)
    res.send({
        status: 0,
        msg: "获取用户信息成功",
        data: req.user
    })
})
// 提交用户的信息
app.post("/my/userinfo", (req, res) => {
    const body = req.body
    console.log(body)
    res.send({
        status: 0,
        data: req.body,
        msg: "提交用户信息成功"
    })
})
// 修改密码
app.post("/my/updatePwd", (req, res) => {
    const body = req.bdoy
    res.send({
        status: 0,
        data: body,
        msg: '修改密码成功'
    })
})
// 更换头像
app.post("/my/update/avatar", (req, res) => {
    console.log(req.body)
    res.send({
        status: 0,
        data: req.body,
        msg: "更新头像成功"

    })
})
// 使用全局错误处理中间件， 解析捕获 jwt失败后产生的错误
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        return res.send({
            status: 401,
            msg: "无效的token"
        })
    }
    res.send({
        status: 500,
        msg: "未知的错误"
    })
})
app.listen(9090, function () {
    console.log('http://127.0.0.1:9090')
})