$(function () {
    let form = layui.form
    let layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度必须在1 ~ 6个字符之间!"
            }
        }
    })
    // 初始化用户的基本信息
    initUserInfo()

    function initUserInfo() {
        $.ajax({
            method: "GET",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("获取用户信息失败")

                }
                console.log(res)
                // layer.msg("获取用户信息成功")
                form.val("formUserInfo", res.data)

            }
        })
    }
    $("#btnRest").on("click", function (e) {
        e.preventDefault()
        initUserInfo()
    })
    $(".layui-form").on("submit", function (e) {
        e.preventDefault()
        // 发起 Ajax数据请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("更新信息失败")
                }
                console.log(res)
                layer.msg("更新信息成功")
                // 调用父页面中的方法 重新渲染用户的头像和用户的信息
                // window.parent.getUserInfo()
            }
        })
    })
})