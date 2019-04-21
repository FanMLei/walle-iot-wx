import api from '../../api/api.js'
Page({
  data: {
    edit:true,
    username:'',
    uid:'',
    email:'',
    sex:'',
    birthday:'',
    tel:'',
    address:'',
    introduction:''
  },

  onLoad: function (options) {
    api.userInfo((res)=>{
     console.log(res.data)
     this.setData(
       res.data.data
     )
    })
  },
  edit(){
    this.setData({
      edit:false
    })
  }
})
