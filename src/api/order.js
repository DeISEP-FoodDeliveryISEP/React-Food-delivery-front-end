import { $axios } from "../common/request";

// submit order
export function addOrderApi(data) {
  return $axios({
    'url': '/order/submit',
    'method': 'post',
    data
  })
}

// query all orders
export function orderListApi() {
  return $axios({
    'url': '/order/list',
    'method': 'get',
  })
}

// query orders by page
export function orderPagingApi(data) {
  return $axios({
    'url': '/order/userPage',
    'method': 'get',
    params: { ...data }
  })
}

// order again
export function orderAgainApi(data) {
  return $axios({
    'url': '/order/again',
    'method': 'post',
    data
  })
}