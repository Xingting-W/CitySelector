function ajax(data) {
    // 创建异步对象
    var xhr = null;
    if (window.XMLHttpRequest) {//标准的浏览器
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    // 配置参数
    var type = data.type == 'get' ? 'get' : 'post';
    var url = '';
    if (data.url) {
        url = data.url;
        if (type == 'get') {
            url += "?" + data.data
        }
    }
    xhr.open(type, url);

    // 发送
    if (type == 'get') {
        xhr.send(null);
    } else if (type == 'post') {
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(data.data);
    }

    // 指定回调函数
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                if (typeof data.success == 'function') {
                    var d = data.dataType == 'xml' ? xhr.responseXML : xhr.responseText;
                    data.success(d);
                }
            } else {
                if (typeof data.failure == 'function') {
                    data.failure();
                }
            }
        }
    }
}