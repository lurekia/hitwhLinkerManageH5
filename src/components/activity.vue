<template>
  <div class="main">
    <increase v-if="store.dialogVisible"></increase>
    <div class="header-function">
      <div class="search">
        <label for="" class="label">标题</label>
        <input type="text" placeholder="请输入标题" v-model="Keyword" />
        <el-button type="primary" :icon="Search" @click="handleSearch()"
          >搜索</el-button
        >
      </div>
      <div class="main-function">
        <div class="four-function">
          <div class="left-function">
                <el-button type="primary" plain :icon="Plus" @click="plusHandle()">新增</el-button>
          </div>
          <el-button type="danger" plain :icon="Delete" @click="handleDelete()">删除</el-button>
        </div>
        <!-- <div class="two-function">
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
            <el-button :icon="RefreshRight" circle @click="shuaxin()" />
          </el-tooltip>
        </div> -->
      </div>
    </div>
    <div class="list">
      <el-table
        ref="multipleTableRef"
        :data="store.showActivity"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :table-layout="tableLayout"
      >
        <el-table-column type="selection"/>
        <el-table-column prop="title" label="标题"/>
        <el-table-column prop="tag" label="标签"/>
        <el-table-column prop="start_time" label=" 起始时间" />
        <el-table-column prop="position" label="地点"/>
        <el-table-column prop="img" label="图像"/>

          <!-- <template #default="scope">
            <el-switch v-model="scope.row.status" />
          </template>
        </el-table-column> -->
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              type="primary"
              :icon="Edit"
              size="small"
              plain
              text
              @click="handleEdit(scope.row.classification, scope.row.title)"
              >修改</el-button
            >
            <el-button
              type="primary"
              :icon="Delete"
              size="small"
              plain
              text
              @click.prevent="
                deleteRow(scope.row.classification, scope.row.title)
              "
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div class="page-bottom">
        <el-pagination
          :current-page="currentPage.value"
          :page-size="pageSize"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          style="float: right"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script setup>
import Increase from "./Increase.vue";
import {
  Plus,
  Edit,
  Delete,
  SetUp,
  Search,
  RefreshRight,
} from "@element-plus/icons-vue";
import { ref, reactive, onMounted, computed, toRaw } from "vue";
import eventBus from "../utils/bus";
import { useMainStore } from "../store/index";
import { ElMessage } from "element-plus";
import { searchPageAPI, deletenoteAPI, changenoteAPI } from "../api/note";
import dayjs from "dayjs";
import { nanoid } from "nanoid";
import { useRouter } from "vue-router";

const store = useMainStore();

// 搜索
const Keyword = ref("");
const handleSearch = () => {
  if (Keyword.value === "") {
    console.log("关键词为空");
    store.keyword = " ";
  } else {
    store.keyword = Keyword.value;
    // Keyword.value = "";
  }
  eventBus.emit("handleLoad");
};

// 新增功能
// 弹出增加笔记的对话框
const plusHandle = () => {
    store.dialogVisible = true;
}



const now = new Date();
const tableLayout = ref("auto");
const value1 = ref(true);

const multipleTableRef = ref();
const multipleSelection = ref([]);

// 注意想使用的时候ref要加.value
const currentPage = ref(store.page_index);
// 每页展示个数
const pageSize = ref(store.page_size);
const total = computed(() => {
  return store.notes.length;
});

// 加载数据
const loadNotes = () => {
  searchPageAPI(
    store.sortName,
    store.keyword,
    store.page_index,
    store.page_size
  ).then((response) => {
    var notes = [];
    console.log(response, typeof response);
    for (var i in response) {
      const obj = response[i];
      const note = {
        id: i,
        title: obj.title,
        content: obj.content,
        classification: obj.sortName,
        description: obj.description,
        status: obj.hideState,
        createTime: obj.time.substr(0, 10),
      };
      notes.unshift(note);
    }
    store.notes = notes;
  });
};
// 表格展示的数据应该是动态的，和分页里面的数据相呼应
const tableData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return store.notes.slice(start, end);
});
// 改变每页展示的max值


const handleSizeChange = (val) => {
  console.log(`每页 ${val} 条`);
  pageSize.value = val;
  multipleTableRef.value.setCurrentRow(null);
};
// 换页
const handleCurrentChange = (val) => {
  console.log(`当前页: ${val}`);
  currentPage.value = val;
  multipleTableRef.value.setCurrentRow(null);
};

const handleSelectionChange = (val) => {
  multipleSelection.value = val;
  // console.log(multipleSelection.value);
};

// 删掉一行
const deleteRow = function (classification, title) {
  // store.deleteNote(id)
  deletenoteAPI(classification, {
    title,
  }).then((response) => {
    console.log(response);
    ElMessage({
      message: "删除成功",
      type: "success",
    });
    loadNotes();
  });
};
// 删掉几行
const handleDelete = () => {
  const selections = toRaw(multipleSelection.value);
  // console.log(selections);
  selections.forEach((selection) => {
    // console.log(selection);
    deleteRow(selection.classification, selection.title);
  });
};
// 处理修改
const handleEdit = (sortNameforedit, oldTitleforedit) => {
  store.dialogVisible = true;
  store.flag = true;
  store.sortNameforedit = sortNameforedit;
  store.oldTitleforedit = oldTitleforedit;
};


// 初始化
onMounted(() => {
  loadNotes();
});
</script>

<style>
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
  border: 2px solid rgb(248, 249, 250);
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

.list {
  margin: 0 4%;
}

.page-bottom {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 20px;
}
</style>