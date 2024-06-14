$(function () {
    getUserInfo()
    // 获取用户信息

    function getUserInfo() {
        $.ajax({
            method: "GET",
            url: '/my/userinfo',
            //  header 就是请求头配置对象
            headers: {

                Authorization: "Bearer " + (localStorage.getItem("token") || ''),

            },

            success: (res) => {
                // console.log(res)
                if (res.status !== 0) {
                    return layui.layer.msg("获取用户信息失败")
                }
                layui.layer.msg("获取用户信息成功")
                //调用 renderAvatar 渲染用户头像
                renderAvatar(res.data)

            },
            // 无论成功还是失败 最终都会调用comolete回调函数
            // complete: function (res) {
            //     // console.log("执行了complete 回调")
            //     // console.log(res)
            //     if (res.responseJSON.status === 401 && res.responseJSON.msg === '无效的token') {
            //         //  1 强制清空token
            //         localStorage.removeItem("token")
            //         // 2. 强制跳转到登录页面
            //         location.href = 'file:///Users/xushuxin/Desktop/html/bigevent/login.html'
            //     }
            // }
        })


    }
    // 渲染用户的头像
    function renderAvatar(user) {
        //1、 获取用户的名称
        let name = user.nickname || user.username
        //  2、 设置欢迎的文本
        $(".welcome").html(`欢迎&nbsp;&nbsp;${name}`)
        // 3、 按需渲染用户的头像
        if (user.user_pic !== '') {
            //  3.1 渲染图片图像
            $(".layui-nav-img").attr("src", user.user_pic).show()
            $(".text-avatar").hide()
        } else {
            //  3.2 渲染文字图像
            $(".layui-nav-img").hide()
            let first = name[0].toUpperCase()
            $(".text-avatar").html(first).show()
        }
    }
    // 退出登录
    let layer = layui.layer
    $(".btnLogout").on("click", function () {
        // 提示用户是否退出
        layer.confirm('确定退出登录?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
            //  1.清空本地存储中的token
            localStorage.removeItem("token")
            // 重新跳转到登录页面
            location.href = 'file:///Users/xushuxin/Desktop/html/bigevent/login.html'
            // 关闭confirm 询问框
            layer.close(index);
        });
    })

})