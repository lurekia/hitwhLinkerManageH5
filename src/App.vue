<template>
  <div class="view">
      <router-view style="width: 100%; height: 100%;"></router-view>
  </div>
</template>



<style>

.view {
  width: 100%;
  height: 100%;
}


</style>
<script setup>
import { useRouter, RouterView } from 'vue-router'
import { ElMessage } from 'element-plus';
import { useMainStore } from './store/index.js'
const router = useRouter()
const store = useMainStore()
// 全局前置路由守卫————初始化的时候被调用、每次路由切换之前被调用
router.beforeEach((to, from, next) => {
  console.log('navigation-guards');
    //如果路由需要跳转
    if (to.meta.isAuth) {
        //判断 如果school本地存储是qinghuadaxue的时候，可以进去
        if (store.isLogin||to.name=='NewLogin') {
            next()  //放行
        } else {
            ElMessage({
              message: '请登陆',
              type: 'error'
            })
            router.push('/NewLogin')
        }
    } else {
        // 否则，放行
        next()
    }
})
// 全局路由守卫
// router.beforeEach((to, from, next) => {
// console.log('navigation-guards');
// // to: Route: 即将要进入的目标 路由对象
// // from: Route: 当前导航正要离开的路由
// // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
// const nextRoute = ['Home', 'NewRegister', 'NewLogin'];
// // 未登录状态；当路由到nextRoute指定页时，跳转至login
// if (nextRoute.indexOf(to.name) >= 0) {
//   if (!store.isLogin) {
//     ElMessage({
//       message: '请登陆后再查看，你目前无权进入',
//       type: 'error'
//     })
//   router.push({ name: 'NewLogin' })
//   }
// }
// // 已登录状态；当路由到login时，跳转至home
// if (to.name === 'NewLogin') {
//   if (store.isLogin) {
//   router.push({ name: 'Home' });
//   }
//   }
//   next();
// });
</script>
