<template>
    <div class="header-function">
        
        <div class="search">
            <label for="" class="label">标题</label>
            <input type="text" placeholder="请输入标题" v-model="Keyword">
            <el-button type="primary" :icon="Search" @click="handleSearch()">搜索</el-button>
        </div>
        <div class="main-function">
            <div class="four-function">
                <div class="left-function"><Increase></Increase></div>
                
                <el-button type="info" plain :icon="Edit" @click="handleEdit()">修改</el-button>
                <el-button type="danger" plain :icon="Delete" @click="handleDelete()">删除</el-button>
                <el-button type="success" plain :icon="SetUp">导出</el-button>
            </div>
            <div class="two-function">

                <el-tooltip
                    class="box-item"
                    effect="light"
                    content="隐藏搜索"
                    placement="top"
                >
                    <el-button :icon="Search" circle />
                </el-tooltip>
                <el-tooltip
                    class="box-item"
                    effect="light"
                    content="刷新列表"
                    placement="top"
                >
                    <el-button :icon="RefreshRight" circle @click="shuaxin()"/>
                </el-tooltip>
                
                
            </div>
        </div>
    </div>
</template>

<script setup>
    import eventBus from '../utils/bus'
    import Increase from './Increase.vue'
    import { Plus, Edit,Delete,SetUp,Search,RefreshRight} from '@element-plus/icons-vue'
    import { nanoid } from 'nanoid'
    import {reactive, inject, ref,onMounted} from 'vue'
    import { useRouter } from 'vue-router'
    import {useMainStore} from '../store/index.js'
    const Keyword = ref('')
    const store = useMainStore()
    // 修改按钮
    const handleEdit = () => {
        eventBus.emit('handleEditButton')
    }
    const handleDelete = () => {
        eventBus.emit('handleDeleteButton')
    }
    const shuaxin = () => {
        store.getMenuItems();
        console.log('刷新被使用');
    }
    const handleSearch = () => {
        
        if(Keyword.value === "") {
            console.log("关键词为空");
            store.keyword = " ";
        } else {
            store.keyword = Keyword.value;
            // Keyword.value = "";
        }
        eventBus.emit('handleLoad')
    }
    
onMounted(()=>{
    
})
</script>

<style scoped>
    .header-function {
        margin: 30px 50px 30px 50px;
    }
    .search .label {
        font-size: 20px;
        font-weight: 600;
        color: black;
    }
    .search input {
        outline: none;
        height: 44px;
        margin: 0 20px;
        padding-left: 10px;
        border: 2px solid rgb(248,249,250);
    }
    .four-function {
        display: flex;
        justify-content: space-between;
    }
    .left-function {
        margin-right: 12px;
    }
    .main-function {
        margin: 50px 0;
        display: flex;
        justify-content: space-between;
    }
</style>