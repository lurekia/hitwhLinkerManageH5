import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'
export const useMainStore = defineStore('main',{
  state:()=>{
    return {
      // 存储分类
      dialogVisible: false,
      MenuItems: [
        {
          value: 'tag1',
          name: 'tag1'
        },
        {
          value: 'tag2',
          name: 'tag2'
        },
        {
          value: 'tag3',
          name: 'tag3'
        },
      ],
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
      oldTitleforedit: '',
      showActivity: [
        {
          id: '001',
          img: 'http://123.com',
          title: '活动1',
          tag: ['tag1', 'tag2', 'tag3'],
          position: 'pos1',
          start_time: 1111,
          end_time: 1111,
          detail: 'detail1',
          status: 0,
          author_id :"001"
        },
        {
          id: '002',
          img: 'http://123.com',
          title: '活动2',
          tag: ['tag1', 'tag2', 'tag3'],
          position: 'pos2',
          start_time: 1111,
          end_time: 1111,
          detail: 'detail2',
          status: 0,
          author_id :"002"
        },
        {
          id: '003',
          img: 'http://123.com',
          title: '活动3',
          tag: ['tag1', 'tag2', 'tag3'],
          position: 'pos3',
          start_time: 1111,
          end_time: 1111,
          detail: 'detail3',
          status: 0,
          author_id :"003"
        }
      ]
    }
  },
  getters:{},
  actions:{}
})
