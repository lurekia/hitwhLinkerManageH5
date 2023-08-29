<template>
  <!-- // 添加对话框 -->
  <div>
    <el-dialog
      v-model="store.dialogVisible"
      width="60%"
      height="70vh"
      align-center
      style="background: linear-gradient(115deg, #56d8e4 10%, #9f01ea 90%)"
    >
      <div class="addnote">
        <div class="container">
          <div class="text">添加活动信息</div>
          <form>
            <div class="form-row">
              <div class="input-data">
                <input type="text" v-model="form.title" required />
                <div class="underline"></div>
                <label>标题</label>
              </div>
              <div class="input-data">
                <input type="text" v-model="form.position" required />
                <div class="underline"></div>
                <label>地点</label>
              </div>
            </div>
            <div class="form-row">
              <!-- <div class="radiobox">
                                <label>状态</label>
                                <el-radio-group v-model="form.status" class="radio">
                                    <el-radio label='1' size="small">显示</el-radio>
                                    <el-radio label='2' size="small">隐藏</el-radio>
                                </el-radio-group>
                            </div> -->
              <div class="input-data" style="display: flex; line-height: 40px">
                分类
                <el-select
                  v-model="form.tag"
                  class="m-2"
                  placeholder="请选择分类"
                  size="large"
                  style="margin-left: 10px"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.name"
                    :value="item.name"
                  />
                </el-select>
              </div>
            </div>
            <div class="form-row">
              <div class="input-data" style="display: flex; line-height: 40px">
                起始时间
                <el-date-picker
                  class="m-2"
                  v-model="form.start_time"
                  type="datetime"
                  placeholder="选择时间"
                  style="margin-left: 10px"
                  size="large"
                />
              </div>
              <div class="input-data" style="display: flex; line-height: 40px">
                终止时间
                <el-date-picker
                  class="m-2"
                  v-model="form.end_time"
                  type="datetime"
                  placeholder="选择时间"
                  style="margin-left: 10px"
                  size="large"
                />
              </div>
            </div>
            <div class="form-row">
              <div class="input-data textarea">
                <textarea
                  cols="30"
                  rows="10"
                  required
                  v-model="form.detail"
                ></textarea>
                <div class="underline"></div>
                <label>详情</label>
              </div>
            </div>
            <div class="form-row">
              <div class="file-container">
                <el-upload
                  v-model="form.fileList"
                  action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                  multiple
                  :limit="3"
                >
                  <el-button type="primary" text>上传文件</el-button>
                  <!-- <template #tip>
                  <div class="el-upload__tip">
                    jpg/png files with a size less than 500KB.
                  </div>
                </template> -->
                </el-upload>
              </div>
            </div>
            <div class="form-row submit-btn">
              <div class="input-data">
                <div class="inner"></div>
                <input type="submit" value="保存" @click.prevent="onSubmit()" />
              </div>
              <div class="input-data">
                <div class="inner"></div>
                <input type="submit" value="取消" @click="cancel()" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped>
.addnote {
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  background: #fff;
  width: 800px;
  max-width: 800px;
  padding: 25px 40px 10px 40px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  color: black;
}

.container .text {
  font-size: 35px;
  font-weight: 600;
  text-align: center;
  background: -webkit-linear-gradient(
    right,
    #56d8e4,
    #9f01ea,
    #56d8e4,
    #9f01ea
  );
  /* 以盒子内的文字作为裁剪区域向外裁剪 */
  -webkit-background-clip: text;
  /* 字体改成透明 */
  -webkit-text-fill-color: transparent;
}

.container form {
  padding: 30px 0 0 0 0;
}

.container form .form-row {
  display: flex;
  margin: 32px 0;
}
.radiobox {
  width: 50%;
  display: flex;
  flex-direction: row;
}
form .form-row .input-data {
  width: 100%;
  height: 40px;
  margin: 0 10px;
  position: relative;
}

form .form-row .input-radio {
  width: 100%;
  height: 30px;
  margin: 0 20px;
  position: relative;
}

form .form-row .textarea {
  height: 120px;
}

.input-data input,
.textarea textarea {
  display: block;
  height: 100%;
  width: 100%;
  /* border: 2px solid rgb(224,224,224); */
  border: none;
  font-size: 17px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.12);
}

.textarea textarea {
  resize: none;
  padding-top: 10px;
}

.input-data input:valid ~ label,
.textarea textarea:valid ~ label,
.input-data input:focus ~ label {
  transform: translateY(-26px);
  color: #3498db;
  font-size: 14px;
}

.textarea textarea:focus ~ label {
  transform: translateY(-90px);
  color: #3498db;
  font-size: 14px;
}

.input-data label {
  position: absolute;
  bottom: 10px;
  font-size: 16px;
  pointer-events: none;
  transition: all 0.3s ease;
}

.textarea label {
  width: 100%;
  bottom: 30px;
  background: #fff;
}

.input-data .underline {
  position: absolute;
  bottom: 0;
  height: 2px;
  width: 100%;
}

.input-data .underline::before,
.input-data .underline::after {
  position: absolute;
  content: "";
  height: 100%;
  width: 100%;
  background: #3498db;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.3s ease;
}

.input-data input:valid ~ .underline::before,
.underline::after,
.textarea textarea:valid ~ .underline::before,
.underline::after,
.input-data input:focus ~ .underline::before,
.underline::after,
.textarea textarea:focus ~ .underline::before,
.underline::after {
  transform: scaleX(1);
}

.submit-btn .input-data {
  height: 45px !important;
  width: 25% !important;
  overflow: hidden;
}

.submit-btn {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.submit-btn .input-data .inner {
  height: 100%;
  width: 300%;
  position: absolute;
  left: -100%;
  background: -webkit-linear-gradient(
    right,
    #56d8e4,
    #9f01ea,
    #56d8e4,
    #9f01ea
  );
  transition: all 0.3s;
}

.submit-btn .input-data:hover .inner {
  left: 0;
}

.submit-btn .input-data input {
  position: relative;
  z-index: 2;
  background: none;
  border: none;
  color: #fff;
  font-size: 17px;
  font-weight: 500;
  /* 变成大写字母 */
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
}

.radio {
  width: 100%;
  margin: auto;
}

.file-container {
  width: 100%;
  height: 100px;
  padding: 10px;
  border-bottom: 1px solid rgb(224, 224, 224);
}

.radiobox {
  height: 48px;
  width: 100%;
  line-height: 40px;
  padding-left: 20px;
}

@media (max-width: 700px) {
  .container .text {
    font-size: 30px;
  }

  .container form {
    padding: 10px 0 0 0 0;
  }

  .container form .form-row {
    display: block;
  }

  form .form-row .input-data {
    margin: 35px 0 !important;
  }

  .submit-btn .input-data {
    width: 40;
  }
}
</style>

<script setup>
import { Plus } from "@element-plus/icons-vue";
import { reactive, onMounted, computed, ref } from "vue";
import { useMainStore } from "../store/index";
import { useRouter } from "vue-router";
import eventBus from "../utils/bus";
import { nanoid } from "nanoid";
import { addnoteAPI, changenoteAPI } from "../api/note";
import { ElMessage } from "element-plus";
// do not use same name with ref

const $router = useRouter();
const store = useMainStore();


// 表单默认内容
let form = reactive({
  id: nanoid(),
  img: "http://123.com",
  fileList :[
  {
    name: "element-plus-logo.svg",
    url: "https://element-plus.org/images/element-plus-logo.svg",
  },
  {
    name: "element-plus-logo2.svg",
    url: "https://element-plus.org/images/element-plus-logo.svg",
  }],
  title: "",
  tag: "",
  position: "",
  start_time: 1111,
  end_time: 1111,
  detail: "",
  status: 0,
  author_id: "001",
});
const options = computed(() => {
  return store.MenuItems;
});

// 清除
const clear = () => {
  form = reactive({
    id: nanoid(),
    title: "",
    classification: "",
    content: "",
    description: "",
    status: "1",
    createTime: handleDate(),
  });
};
computed(() => {
  store.form = form;
});
// 提交笔记内容
const onSubmit = () => {
  if (store.flag == false) {
    if (form.title == "") {
      ElMessage({
        message: "请填写标题",
      });
      return;
    }
    if (form.classification == "") {
      ElMessage({
        message: "请选择分类",
      });
      return;
    }
    if (form.content == "") {
      ElMessage({
        message: "请填写笔记内容",
      });
      return;
    }
    ElMessage({
      message: "正在提交ing...",
    });
    const data = {
      title: form.title,
      content: form.content,
      hideState: true,
      description: form.description,
    };
    addnoteAPI(form.classification, data)
      .then((res) => {
        ElMessage({
          message: "添加成功",
          type: "success",
        });
      })
      .catch((res) => {
        ElMessage({
          message: "添加失败",
          type: "warning",
        });
        console.log("添加note失败的promise回调", res);
      });
    store.dialogVisible = false;
    // 提交后初始化表单内容  注意要写成响应式
    clear();
  } else {
    changenoteAPI(store.sortNameforedit, store.oldTitleforedit, {
      title: form.title,
      content: form.content,
    }).then((response) => {
      console.log(response);
      ElMessage({
        message: "修改成功",
        type: "success",
      });
      store.flag = false;
      store.dialogVisible = false;
      eventBus.emit("handleLoad");
    });
  }
};

//取消
const cancel = () => {
  console.log("cancel!");
  store.dialogVisible = false;
  clear();
};

const handleDate = () => {
  const currentDate = new Date(); // 获取当前日期
  const year = currentDate.getFullYear(); // 获取当前年份
  const month = ("0" + (currentDate.getMonth() + 1)).slice(-2); // 获取当前月份（注意加1）
  const day = ("0" + currentDate.getDate()).slice(-2); // 获取当前日期
  const formattedDate = `${year}-${month}-${day}`; // 格式化日期字符串
  return formattedDate; // 输出：xxxx-xx-xx 格式的日期字符串
};

// 修改某笔记
onMounted(() => {
  form.createTime = handleDate();
  eventBus.on("handleEdit", (sortName, oldTitle) => {
    store.dialogVisible = true;
    store.notes.forEach((note) => {
      if (sortName == note.classification && oldTitle == note.title) {
        const obj = {
          id: note.id,
          title: note.title,
          content: note.content,
          createTime: note.createTime,
          description: note.description,
          status: note.status,
          classification: note.classification,
        };
        form = reactive(obj);
      }
    });
    console.log("有note被修改了!");
  });
});
</script>