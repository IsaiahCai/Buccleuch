// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:'/images/user-unlogin.png',
    nickName:"用户未登陆",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database()
    db.collection('zhihu_daily')
      .get()
      .then(res => {
        console.log(res.data)
      })
      .catch(err => {
        console.error(err)
      })
      
    wx.getSetting ({
      success: res =>{
        if(res.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success: res => {
              let {avatarUrl, nickName } = res.userInfo
              this.setData({
                avatarUrl, nickName
              })
            },
          })
        }
      }
    })
  },
  

  uploadimg(){
    wx.cloud.callFunction({
      name:'uploadimg',
      success: res => {
        console.log(res)
        }
      })
  },

  getUserInformation: function(event){
    console.log('getUserInformation打印的事件对象', event)
    let { avatarUrl, nickName} = event.detail.getUserInfo
    this.setData({
      avatarUrl, nickName
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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