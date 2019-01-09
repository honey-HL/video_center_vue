/**
 * 接口API
 */

import axios from 'axios'

axios.defaults.baseURL = 'http://192.168.21.119:8080/videocenter/api/'; 
// 'http://192.168.21.119:8888/api/'; // 田志勇ip  http://127.0.0.1:8080/videocenter/api/
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
  img: 'http://192.168.21.119:8080/videocenter/', 
  // 'http://192.168.21.119:8888',
  ip: 'http://192.168.21.119:8080/videocenter/api/', 
  // "http://192.168.21.119:8888/api/", // 田志勇ip

  goodsList: 'goods/list'
}
