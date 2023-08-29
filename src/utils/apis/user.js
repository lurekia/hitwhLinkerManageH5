import service from "./axios";
// 用户登录
export function loginAPI(data) {
    return service({
        url: '/user/login',
        method: 'post',
        data: data
    })
}
// 用户注册
export function registerAPI(data) {
    return service({
        url: '/user/register',
        method: 'post',
        data: data
    })
}
// 用户修改密码
export function changePasswordAPI(oldPassword,newPassword){
    return service({
        url: `/user/${oldPassword}/${newPassword}`,
        method: 'put'
    })
}

