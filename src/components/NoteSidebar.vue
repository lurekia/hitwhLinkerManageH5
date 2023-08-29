<template>
    <div>
        <el-menu active-text-color="blue" class="el-menu-vertical-demo menu" text-color="#333" :default-openeds="openeds"
        background-color="transparent">
            <el-sub-menu index="1">
                <template #title>
                    <el-icon>
                        <location />
                    </el-icon>
                    <span style="marginLeft:35px;fontSize:20px;fontWeight:500;margin-right: 30px;">笔记分类</span>
                    
                    <el-button text @click.stop="addMenuItem()">
                        <el-icon>
                            <Plus />
                        </el-icon>
                    </el-button>
                </template>
                <li class="a" @click="handleSearchClass()">无分类</li>
                <el-menu-item v-for="menuItem in store.MenuItems" :key="menuItem.id"
                    @click="handleSearchClass(menuItem.name)" class="a">
                    <span style="width:170px;textAlign:left">{{ menuItem.name }} </span>
                    <el-icon @click="handleDelMenu(menuItem.name)">
                        <Delete />
                    </el-icon>
                </el-menu-item>
            </el-sub-menu>

        </el-menu>
        <el-dialog v-model="dialogFormVisible" title="新建分类">
                        <el-form :model="form">
                            <el-form-item label="分类名称" :label-width="formLabelWidth">
                                
                                <el-input v-model="form.name" autocomplete="off" autofocus />
                            </el-form-item>
                        </el-form>

                        <template #footer>
                            <span class="dialog-footer">
                                <el-button @click="dialogFormVisible = false">取消</el-button>
                                
                                <el-button type="primary" @click="subMenuItem()">
                                    创建
                                </el-button>
                            </span>
                        </template>
                    </el-dialog>
    </div>
</template>

<script setup>

import { nanoid } from 'nanoid'
import { reactive, ref, inject, onMounted } from 'vue'
import { useMainStore } from '../store/index'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { addsortAPI,getsortAPI,deletesortAPI } from '../api/sort'
import { getnoteAPI } from '../api/note'
import eventBus from '../utils/bus'
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const $router = useRouter()
const store = useMainStore()
const openeds = ['1']
const form = reactive({
    name: '',
    id: ''
})
//获得分类

const loadMenu = () => {
        getsortAPI().then(res => {
        console.log('获得的分类',res);
        console.log('获得的分类内容',res);
        var sorts = [];
        for(let i in res)
            {
                sorts.push({
                    id : i,
                    name : res[i]
                })
            }
        store.MenuItems = sorts
    })
}
loadMenu()
const addMenuItem = () => {
    dialogFormVisible.value = true;
}
//添加分类
const subMenuItem = () => {
    console.log('submitmenu!')
    // store.addMenu(form)
    addsortAPI({
        "sortName": form.name
    }).then( res=> {
            ElMessage({
            message: '添加分类成功',
            type: 'success'
        })
        loadMenu()
    }).catch(res =>{
        ElMessage({
            message: '添加分类失败',
            type: 'warning'
        })
    })
    // 关闭对话框
    dialogFormVisible.value = false;
    // 清空下一次内容
    form.name = ''
}
// 删除分类
const handleDelMenu = (name)=> {
    deletesortAPI({
        sortName : name
    }).then(response => {
        ElMessage({
            message: '删除分类成功',
            type: 'success'
        })
        loadMenu();
    })
}


//清除分类
const clearFilterType = () => {
    store.clearFilters()
}
const handleSearchClass = (sortName) => {
    if(sortName) {
        store.sortName = sortName;
    } else {
        console.log("获取全部类名");
        store.sortName = " ";
    }
    eventBus.emit("handleLoad",);
}
</script>

<style scoped>
.menu {
    padding: 10px;
    width: 320px;
    background: rgb(225 225 225 / 24%);
    box-shadow: 0 8px 32px 0 rgb(0 0 0/37%);
    backdrop-filter: blur(15px);
    border: 1px solid rgba(225, 225, 225, 0.18);
    display: grid;
    text-align: center;
    height: 100vh;
}
.a {
    text-decoration: none;
    margin-top: 2px;
    margin-bottom: 10px;
    color: black;
    width: 100%;
    background: rgba(255,255,255,0.2);
    transition: 0.2s;
}
.div {
    margin: 0.2em;
}

.a:hover{
    background: rgba(225,225,225,0.5);
    transform: scale(1.1);
    box-shadow: 0 8px 32px 0 rgb(0 0 0/37%);
    color: #fff;
}
.el-menu ul{
    background-color: transparent;
}
</style>