export function requestPermission() {
    console.log("开始请求弹窗权限");
    if (window.Notification && Notification.permission !== "denied") {
        console.log("未被拒绝，开始请求权限");
        Notification.requestPermission(function (state) {
            console.log("询问用户意见");
            if (status === "granted") {
                console.log("用户同意授权");
            }
        });
    }
}

export function pushNotification(msg = "", title = "sir, you got a message") {
    let n = new Notification(title, {
        body: msg,
    });

    // 两秒后关闭通知
    setTimeout(function () {
        n.close();
    }, 5000);
}

export default {
    requestPermission,
    pushNotification,
};
