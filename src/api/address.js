import { $axios } from "../common/request";

export function addressListApi() {
  return $axios({
    'url': '/addressBook/list',
    'method': 'get',
  })
}

//Retrieve newest address
export function addressLastUpdateApi() {
  return $axios({
    'url': '/addressBook/lastUpdate',
    'method': 'get',
  })
}

//add new address
export function addAddressApi(data) {
  return $axios({
    'url': '/addressBook',
    'method': 'post',
    data
  })
}

//edit address
export function updateAddressApi(data) {
  return $axios({
    'url': '/addressBook',
    'method': 'put',
    data
  })
}

//delete address
export function deleteAddressApi(params) {
  return $axios({
    'url': '/addressBook',
    'method': 'delete',
    params
  })
}

//find single address
export function addressFindOneApi(id) {
  return $axios({
    'url': `/addressBook/${id}`,
    'method': 'get',
  })
}

//设置默认地址
export function setDefaultAddressApi(data) {
  return $axios({
    'url': '/addressBook/default',
    'method': 'put',
    data
  })
}

//获取默认地址
export function getDefaultAddressApi() {
  return $axios({
    'url': `/addressBook/default`,
    'method': 'get',
  })
}