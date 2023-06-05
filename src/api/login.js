import { $axios } from "../common/request";

export function loginApi(data) {
  return $axios({
    'url': '/user/login',
    'method': 'post',
    data
  })
}

export function sendMsgApi(data) {
  return $axios({
    'url': '/user/sendMsg',
    'method': 'post',
    data
  })
}

export function loginoutApi() {
  return $axios({
    'url': '/user/loginout',
    'method': 'post',
  })
}

