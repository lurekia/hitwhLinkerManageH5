import { createRouter, createWebHashHistory } from 'vue-router'


import Home from '../pages/Home.vue'
import NewRegister from '../pages/NewRegister.vue'
// import Increase from '../pages/Increase.vue' // 该组件由对话框实现
import NewLogin from '../pages/NewLogin.vue'
import test from '../pages/test.vue'

const routes = [
    {
        path: '/',
        redirect: "/Home",
    },
    {
        path: '/NewLogin',
        name: 'NewLogin',
        component: NewLogin,
        meta: { isAuth:true,title:'登录页面' }
    },
    
    {
        path: '/NewRegister',
        name: 'NewRegister',
        component: NewRegister,
        meta: { isAuth:false,title:'注册界面' }
    },
    {
        path: '/Home',
        name: 'Home',
        component: Home,
        meta : { isAuth:true,title: '笔记主页' }
    },
    {
        path: '/test',
        component: test
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;
