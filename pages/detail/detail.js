wx-Page({


  data: {
    pubFormInfo: [],
  },


  onLoad: function (options) {
    console.log(options.id)
 
    const db = wx.cloud.database();
    const Form = db.collection("pubForm").where({
      _id : options.id
    })
    Form.get().then(res => {
      console.log('获得表单数据', res.data)
      const that =this;
      const pubFormInfo = res.data;
      that.setData({
        pubFormInfo
      })
      console.log('test是否卡在setData那', pubFormInfo)
    })
    

    
  },
  //  const db = wx.cloud.database();
  //  const Form = db.collection("pubForm").where({
  //    _openid :'user-open-id'
  //  })
  //  console.log(options._id)
  //  Form.get().then(res => {                  //此处用的是promise异步方法调用数据
  //    console.log('获得表单数据', res.data)
  //    if (res.data.length ===0){
  //      wx.showToast({
  //        title: '获取失败',
  //        icon: "none"
  //      })
  //    } else{
  //      wx.showToast({
  //        title: '获取成功',
  //      })
  //      this.setData({
  //        pubForm: res.data              //修改数据状态
  //      })
  //    }
  //  })



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