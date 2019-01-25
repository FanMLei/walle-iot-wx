// components/card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bgColor:{
      type:String,
      value: ''
    },
    title:{
      type:String,
      value: '无数据'
    },
    endNum:{
      type: Number,
      value:0
    },
    startNum:{
      type:Number,
      value:0
    },
    imgs:{
      type:String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },
  /**
   * 组件的方法列表
   */
  methods: {
    
  },
  lifetimes: {
    ready(){

    }
  }
})
