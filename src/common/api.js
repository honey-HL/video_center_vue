/**
 * 接口API
 */

import axios from 'axios'

axios.defaults.baseURL = 'https://jszx.3ceasy.com/video/videocenter/api/' // 线上ip
// axios.defaults.baseURL = 'http://192.168.21.119:8080/videocenter/api/'; // 本地ip
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.timeout =  10000;

const http = (method, url, params, successCallback, errorCallback) => {
  axios({
    method: method,
    url: url,
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
    //   'token': localStorage.getItem("accessToken")
    },
    params: params
  }).then((response) => {
    // console.log("******************");
    // console.log(params);
    // console.log(url);
    // console.log(response.data);
    // console.log(response)
    if (response.data.succ) {
      successCallback(response.data);
    }
    else if (response.data.code == 1005) {
      localStorage.removeItem("accessToken");
      errorCallback(response.data);
    }
    else if (response.data.code == 1050) {
      errorCallback(response.data);
    }
    else {
      errorCallback(response.data);
    }
  }).catch((error) => {
    errorCallback(error);
  });
}


export default { // http://192.168.21.119:8888/admin/image/1546910555490.jpg
    http: http,
    img: 'https://jszx.3ceasy.com/video/videocenter/', // 线上图片ip
    ip: 'https://jszx.3ceasy.com/video/videocenter/api/', // 线上ip
    // img: 'http://192.168.21.119:8080/videocenter/', // 本地图片ip
    // ip: 'http://192.168.21.119:8080/videocenter/api/', // 本地ip

    goodsList: 'goods/list'
}
