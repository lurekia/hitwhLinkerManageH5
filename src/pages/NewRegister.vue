<template>
  <div class="login">
    <img src="../assets/bac.jpg" alt="login image" class="login__img">
    <form action="" class="login__form">
      <h1 class="login__title">注册</h1>

      <div class="login__content">
        <div class="login__box">
          <i class="ri-user-3-line login__icon"></i>
          <div class="login__box-input">
            <input required class="login__input" placeholder=" " v-model="state.account">
            <label for="" class="login__label">邮箱</label>
          </div>
        </div>

        <div class="login__box">
          <i class="ri-lock-2-line login__icon"></i>
          <div class="login__box-input">
            <input :type="passwordStyle" required class="login__input" placeholder=" " v-model="state.password">
            <label for="" class="login__label">密码</label>
            <i class="login__eye" :class="{ 'ri-eye-off-line': isShowOne, 'ri-eye-line': !isShowOne }" id="login-eye" @click="ChangeEyeOne"></i>
          </div>
        </div>

        <div class="login__box">
          <i class="ri-lock-2-line login__icon"></i>
          <div class="login__box-input">
            <input :type="passwordStyle_v" required class="login__input" placeholder=" " v-model="state.password_v">
            <label for="" class="login__label">确认密码</label>
            <i class="login__eye" :class="{ 'ri-eye-off-line': isShowTwo, 'ri-eye-line': !isShowTwo }" id="login-eye" @click="ChangeEyeTwo"></i>
          </div>
        </div>
      </div>
      <div class="login__check">
        <div class="login__check-group">
          <!-- <input type="checkbox" class="login__check-input">
          <label for="" class="login__check-label">记住密码</label> -->
        </div>
        <a href="#" class="login__forgot">忘记密码?</a>

      </div>
      
      <button class="login__button" @click="submit">注册</button>
      <p class="login__register">
        已有账号? 立即登录  <router-link to="/NewLogin"> 登录 </router-link>
      </p>


    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { registerAPI } from '../api/user';
import { ElMessage } from 'element-plus'

const isShowOne = ref(true)//密码处眼睛的样式
const isShowTwo = ref(true)//确认密码处眼睛的样式
const passwordStyle = ref('password')//密码文本的样式
const passwordStyle_v = ref('password')//确认密码文本的样式

const state = reactive({
    account: '',
    password: '',//密码
    password_v: '',//确认密码

})
//点击眼睛改变密码显示的函数
const ChangeEyeOne = () => {
    if(isShowOne.value===true)
    {
      isShowOne.value=false
      passwordStyle.value='text'
    }
    else {
      isShowOne.value=true
      passwordStyle.value='password'
    }
}
//点击眼睛改变确认密码显示的函数
const ChangeEyeTwo = () => {
    if(isShowTwo.value===true)
    {
      isShowTwo.value=false
      passwordStyle_v.value='text'
    }
    else {
      isShowTwo.value=true
      passwordStyle_v.value='password'
    }
}
function submit(){
  if (state.password!= state.password_v) {
    ElMessage({
          message: '两次输入的密码不一致',
          type: 'warning',
        })
    return
    }
    registerAPI({
        "telephoneNumber": state.account,
        "password": state.password
    }).then(res => {
      ElMessage({
          message: '注册成功',
          type: 'success',
        })
      console.log(res);
    }).catch(res => {
      ElMessage({
        message: '注册失败',
        type: 'warning'
      })
      console.log(res);
    })
} 
</script>