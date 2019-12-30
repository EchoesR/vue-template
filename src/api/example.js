import request from '@/utils/request'

export function radioGroup(query) {
  return request({
    url: "/radioGroup",
    method: "get",
    params: query
  })
}

export function cascader(query) {
  return request({
    url: "/cascader",
    method: "get",
    params: query
  })
}

export function formApi(query) {
  return request({
    url: "/form",
    method: "post",
    data: query
  })
}
