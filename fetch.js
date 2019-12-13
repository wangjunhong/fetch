//检查http状态
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  } else {
    //异常情况自己返回固定消息
    return {
      code: 666,
      errorMsg: "网络错误，请重试",
      result: false,
      success: false
    };
  }
}

class Request {
  constructor(config) {
    this.config = {
      baseUrl: "/api",
      ...config
    };
    const {request} = this;
    this.request = request.bind(this);
  }

  request(url, options) {
    let methods = ["POST", "PUT", "DELETE"];
    //兼容直接拼接的写法 默认GET请求
    if (options) {
      if (methods.includes(options.method)) {
        //如果是传JSON格式
        if (options.body.isJson) {
          delete options.body.isJson;
          options.body = JSON.stringify(options.body);
          options.headers = {
            "Content-Type": "application/json;charset=utf-8"
          };
        } else {
          if (options.method === "DELETE") {
            url += getResult(options.body);
            delete options.body;
          } else {
            //如果是表单格式提交
            let params = new URLSearchParams();
            for (let x in options.body) {
              params.append(x, options.body[x]);
            }
            options.body = params;
          }
        }
      } else {
        //将参数拼接到url后面
        url += getResult(options.body);
        options = null;
      }
    }

    //获取拼接URL参数
    function getResult(obj) {
      let params = "";
      for (let x in obj) {
        params += `&${x}=${obj[x]}`;
      }
      //将参数拼接到url后面
      return params;
    }
    //启用真实的代理地址
    let realUrl = this.config.baseUrl + url;
    //第一个参数替换为?;
    if (realUrl.indexOf("?") === -1) {
      realUrl = realUrl.replace("&", "?");
    }

    return fetch(realUrl, options)
      .then(checkStatus)
      .then(data => ({ data }))
      .catch(err => ({ err }));
  }
}

module.exports = Request;
