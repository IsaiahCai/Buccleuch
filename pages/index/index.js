import {request} from "../../request/index";
 

wx-Page({

  /*页面的初始数据*/
  data: {
   swiperList:[
     {
      "image_src": "https://636c-cloud1-4gh96l4ab5ce35bd-1308082237.tcb.qcloud.la/avatar.jpg?sign=ddccb339b7f71a7212fbdfb102c31539&t=1637354492", 
      "open_type": "navigate", 
      "goods_id": 12, 
      "navigator_url": "/pages/search/index"
  }, 
  {
      "image_src": "https://636c-cloud1-4gh96l4ab5ce35bd-1308082237.tcb.qcloud.la/rose.jpg?sign=907e778eed3b3dfc0eb2ea274fa68dd3&t=1637354796", 
      "open_type": "navigate", 
      "goods_id": 13, 
      "navigator_url": "/pages/search/index"
  }, 
  {
      "image_src": "https://636c-cloud1-4gh96l4ab5ce35bd-1308082237.tcb.qcloud.la/code.jpeg?sign=52897c04ef612620b9332939d6f24707&t=1637358142", 
      "open_type": "navigate", 
      "goods_id": 14, 
      "navigator_url": "/pages/search/index"
  }],
   imageList:[
     {
       imageUrl:'/images/daJohn.jpg',
       content:"全身照John，价格美丽快点联系"
     },
     {
      imageUrl:'/images/lilJohn.jpg',
      content:"SpotlightJohn，精心打造"
     },
     {
      imageUrl:'/images/crown.jpg',
      content:"机关算尽太聪明"
     },
     {
      imageUrl:'/images/westmin.jpg',
      content:"反误了卿卿性命"
     }
   ],

   pubForm: [] //该定义和detail页面的pubForm会相互冲突吗，还是只存在一个页面的定义
  },

  onLoad: function (options) {
    const db = wx.cloud.database();
    const Form = db.collection("pubForm").where({})
    Form.get().then(res => {                  //此处用的是promise异步方法调用数据
      console.log('获得表单数据', res.data)
      if (res.data.length ===0){
        wx.showToast({
          title: '获取失败',
          icon: "none"
        })
      } else{
        wx.showToast({
          title: '获取成功',
        })

        this.setData({
          pubForm: res.data              //修改数据状态
        })
      }
    })
  },
    
  

  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})