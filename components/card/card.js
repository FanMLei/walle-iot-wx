import CountUp from '../../utils/count-up.js'
Component({
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

  methods: {
  },
})
