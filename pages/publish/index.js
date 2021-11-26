// pages/publish/index.js
var util = require('../../util');   //引入时间模块

Page({
  onShareAppMessage(){
    return{
      title:'checkbox',
      path: 'page/component/pages/checkbox/checkbox'
    }
  },
  data: {
    transList:[
      {value:'inperson',name:'面交'},
      {value:'post',name:'邮寄'},
      {value:'selfhelp',name:'自取'},
      {value:'unlimit',name:'交易方式不限'}
    ],
    trans:"",

    categoryList: ['日用品','衣物','厨具','电子设备','交通工具','其他'],
    category: "",
    quality: "",
    qualityList: ['全新','九成新','八成新','七成新','六成新','五成新','四成新','三成新','二成新','一成新'],
    imgurl: "",
    address:"",
    type:"",
    title:"",
    isSubmit:false,
    warn:"",
    price: "",
    originalprice:"",
    des:"",
    contactname: "",
    phone: "",
    university: "",
    validtime: "",
    
  },

  bindPickerChange:function(e){
    console.log('picker发送选择改变，携带值', e.detail.value)
    this.setData({
      index: e.detail.value,
  
    })
  },

  getUserLocation:function(e){
    
    wx.getLocation({
      type: 'gcj02',
      success (res){
        const latitude = res.latitude
        const longitude = res.longitude
    },
    }),
    wx.chooseLocation({
      success: (res) => {
        const latitude = res.latitude
        const longitude = res.longitude
        const address = res.address
        const name = res.name
        console.log('地址获取成功',res)
        this.setData({
          lat_long: "经纬度"+longitude+", "+latitude,
          loc: "地名"+ name,
          add: "地址"+ address
        })
      },
      fail: (res) => {
        console.log('出现了错误', res)
      }
    })
  }, 


  checkboxChange(e){
    console.log('checkbox发生check事件，携带value值为:',e.detail.value)
  
    const transList= this.data.transList
    const values = e.detail.value
    
    for (let i = 0, lenI= transList.length; i< lenI; ++i){
      transList[i].checked = false
      for (let j = 0, lenJ = values.length; j < lenJ; ++j){
        if (transList[i].value === values[j]){
          transList[i].checked = true
          break
        }
      }
    }

    this.setData({
      transList
    })
  },

  chooseImg:function(){

  var _this = this;
    wx.chooseImage({
      count: 1,
      sizeType:['compressed'],
      sourceType:['album','camera'],
      success:function(res){
        
  
        wx.showLoading({                              //Loading提示
          title: '上传中',
        })
        const filePath = res.tempFilePaths[0]
        const cloudPath = `cloudbase/${Date.now()}-${Math.floor(Math.random(0,1)*1000)}`+filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('上传成功后获得的res:', res)           
            wx.hideLoading()                          //Loading提示    
            wx.showToast({                            //Toast提示    
                title: '上传图片成功',
                duration: 2000
            });
            

            _this.setData({                    
              imgurl: res.fileID              
            })
          },

          //不success情况下，怎么写。另外把choose和upload两个函数分开//
        })

      }      
    })
  
  },
     


  bindFormSubmit:function(e){
    const imgurl = this.data.imgurl;
    var time = util.formatTime(new Date());   //引入时间
    console.log('form发生了submit事件，携带数据为: ', e.detail.value)
    //用来检验表单填写是否完整，后续要把字段完整
    let {phone, contactname} =e.detail.value;
    if(!phone || !contactname){
      this.setData({
        warn: "手机或名字为空!",
        isSubmit: true
      })
    return;
    }
    this.setData({
      warn: "",
      phone,
      contactname,
      imgurl,
      time: time
    })

  //上传到数据库
    var adds = e.detail.value;
    const db = wx.cloud.database()
    db.collection('pubForm').add({
      data: {
        adds,
        imgurl,
        time
      }
    })
    .then(res => {
      console.log("数据库添加数据成功：", res)
      wx.showToast({
        title: '发布成功！',
        duration: 2000
      });
    })
    .catch("出现了error：",console.error)


  },
  

})  