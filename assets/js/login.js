$(function () {
    //   点击 “去注册”链接
    $("#link_reg").on("click", function () {
        $('.login-box').hide()
        $(".reg-box").show()
    })
    //  点击“去登录 ”链接
    $("#link_login").on("click", function () {
        $('.login-box').show()
        $(".reg-box").hide()
    })
    let form = layui.form
    // 导入layer
    let layer = layui.layer
    form.verify({
        // 自定义了一个叫做pwd校验规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 校验朗次密码是否一致的规则
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            //  然后进行一次内容的判断
            //  如果判断失败  return 一个提示消息即可
            let pwd = $(".reg-box [name=password]").val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })
    // 发起注册注册用户的ajax 请求
    $("#form_reg").on("submit", function (e) {
        // 阻止表单的默认提交行为
        e.preventDefault()
        // 发起ajax的post 请求
        let data = {
            username: $('#form_reg [name=usename]').val(),
            password: $('#form_reg [name=password]').val()

        }
        $.post('/api/reguset', data, function (res) {


            if (res.status !== 0) {
                // console.log(res.status)
                return layer.msg('提交失败')
            }
            // console.log(res)

            layer.msg('注册成功')
            // 模拟人的点击行为
            $("#link_login").click()
        })
    })
    // 发起登录的ajax请求
    $("#form_login").submit(function (e) {
        // 阻止默认提交行为
        e.preventDefault()
        // 发起ajax请求
        $.ajax({
            method: "POST",
            url: '/api/login',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("登录失败")
                }
                console.log(res)
                layer.msg("登录成功")
                // 将登录成功得到的token字符串保存到 localStorage中
                localStorage.setItem("token", res.token)
                //   跳转到后台主页
                location.href = 'file:///Users/xushuxin/Desktop/html/大事件项目/index.html'
            }
        })
    })
})