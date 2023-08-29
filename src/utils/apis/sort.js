import service from "./axios";
//获得用户分类的数量
export function getsortNumberAPI() {
    return service({
        url: '/sortnumber',
        method: 'get',
    })
}
// 添加分类
export function addsortAPI(params) {
    return service({
        url: '/sort',
        method: 'post',
        data: params
    })
}
// 获得分类
export function getsortAPI() {
    return service({
        url: '/sort',
        method: 'get',
    })
}
// 删除分类
export function deletesortAPI(params) {
    return service({
        url: '/sort',
        method: 'delete',
        data: params
    })
}