<template>
    <div style="width: 100px; height: 100px; color: black;">

    <el-button type="primary" @click="get()">GET请求</el-button>
    <el-button type="success" @click="post()">POST</el-button>
    <el-button type="info" @click="put()">PUT</el-button>
    <el-button type="warning" @click="deleteitem()">DELETE</el-button>
    <el-button type="danger" @click="emitmsg()">Danger</el-button>
    <el-button :plain="true" @click="open2">success</el-button>
    <el-button :plain="true" @click="open3">warning</el-button>
    <el-button :plain="true" @click="open1">message</el-button>
    <el-button :plain="true" @click="open4">error</el-button>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ElMessage } from 'element-plus'

const get=function()
{
    axios({
        method: 'GET',
        url: 'http://localhost:3000/MenuItems'

    }).then(Response => {
        console.log(Response);
        console.log(Response.data);
    })
}

const post=function()
{
    axios({
        method: 'POST',
        url: 'http://localhost:3000/posts',
        //设置请求体
        data: {
            title: "天气真好",
            author: "我"
        }
    }).then(Response => {
        console.log(Response);
    })
}
//put用于更新数据,张三改李四
const put=function()
{
    axios({
        method: 'PUT',
        url: 'http://localhost:3000/posts/3',
        data: {
            title: "天气真好",
            author: "李四"
        }
    }).then(Response => {
        console.log(Response);
    })
}
//删除数据
const deleteitem=function()
{
    axios({
        method: 'DELETE',
        url: 'http://localhost:3000/posts/3',
    }).then(Response => {
        console.log(Response);
    })
}
const open1 = () => {
  ElMessage('this is a message.')
}
const open2 = () => {
    console.log('success被调用');
  ElMessage({
    message: 'Congrats, this is a success message.',
    type: 'success',
  })
}
const open3 = () => {
  ElMessage({
    message: 'Warning, this is a warning message.',
    type: 'warning',
  })
}
const open4 = () => {
  ElMessage.error('Oops, this is a error message.')
}

</script>