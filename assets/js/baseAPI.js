//  注意： 每次调用 $.get() 或 $.post() 或者$.ajax()的时候 
// 会先调用ajaxPreFilter 这个函数
//  在这个函数中 可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    //  发起真正的ajax 请求之前， 统一拼接请求的根路径
    options.url = 'http://127.0.0.1:9090' + options.url

    // 统一为有权限的接口设置 headers请求头
    if (options.url.indexOf("/my/") !== -1) {
        options.headers = {

            Authorization: "Bearer " + (localStorage.getItem("token") || ''),

        }
    }
    // 无论成功还是失败 最终都会调用comolete回调函数
    options.complete = function (res) {
        // console.log("执行了complete 回调")
        // console.log(res)
        if (res.responseJSON.status === 0 && res.responseJSON.msg === '无效的token') {
            //  1 强制清空token
            localStorage.removeItem("token")
            // 2. 强制跳转到登录页面
            location.href = 'file:///Users/xushuxin/Desktop/html/bigevent/login.html'
        }
    }
})