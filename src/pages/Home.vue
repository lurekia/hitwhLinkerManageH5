<script setup>

import topBar from '../components/topBar.vue'
import user from '../components/user.vue'
import activity from '../components/activity.vue'
import { useRouter } from 'vue-router';

const $router = useRouter()
const showInfo = (path) => {
  $router.push('/home/'+path)
}
</script>
<template>
  <div class="main">
    <topBar></topBar>
    <div class="body">
      <div class="sideBar">
        <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="sideBar-menu"
          default-active=""
          text-color="#fff"
        >
          <el-menu-item index="activity" @click="showInfo('activity')">
            <el-icon><icon-menu /></el-icon>
            <span>活动信息管理</span>
          </el-menu-item>
          <el-menu-item index="user" @click="showInfo('user')">
            <el-icon><icon-menu /></el-icon>
            <span>用户信息管理</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="content">
        <router-view> </router-view>
      </div>
      <!-- <div class="NoteShowbar">
        <NoteFunction></NoteFunction>
        <Note></Note>
      </div> -->
    </div>
  </div>
</template>


<style>
.body {
  display: flex;
  flex-direction: row;
  height: 100%;
  /* padding: 40px; */
  padding-left: 0;
  /* background-color: red; */
}

.NoteShowbar {
  flex: 1;
}

.main {
  /* background: url(117.jpg) no-repeat center; */
    /* 拓展图片来填满元素（保持像素的长宽比），是图片宽高最短的那个边覆盖元素一边即可 */
    background-size: cover;
    /* 铺满屏幕的高度 */
    min-height: 100vh;
}
.body .sideBar-menu {
  height: 100%;
  width: 200px;
}
.body .content {
  height: 100%;
  width: 100%;
}
</style>