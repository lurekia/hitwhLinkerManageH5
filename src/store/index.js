import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'
export const useMainStore = defineStore('main',{
  state:()=>{
    return {
      // 存储分类
      dialogVisible: false,
      MenuItems: [],
      sortName: ' ',
      keyword: ' ',
      page_index: 0,
      page_size: 10,
      isLogin: false,
      // MenuItems,
      notes: [],
      tabelData:[],
      pageData:[],
      form:{},
      flag:false,
      sortNameforedit: '',
      oldTitleforedit: ''
    }
  },
  getters:{},
  actions:{}
})
