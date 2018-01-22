// pages/share/share.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var openid = getApp().globalData.id
    console.log(getApp().globalData.userInfo)
    var time = getApp().globalData.time
    that.setData({
      userInfo: getApp().globalData.userInfo,
    });

    wx.request({
      url: 'https://shop.mqvt6.cn/public/index.php/index/Goods/good',
      data: {
        id: time
      },
      header: {
        'content-type': 'application/json' //
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          time: res.data.data
        })
      }

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
  onShareAppMessage: function (res) {
    var openid = getApp().globalData.id
    var oid=getApp().globalData.oid
    console.log(res)
    var id = res.target.id
    console.log(id)
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
      return {
        title: '您的好友邀请你来拼团',
        path: '/pages/fengxiang/fengxiang?id=' + id + '&openid=' + openid + '&oid=' + oid,
        imageUrl: 'http://shops.mqvt6.cn/pingpingshen.jpg',
        success: function (res) {

          wx.showModal({
            title: '提示',
            content: '转发成功',
            showCancel: false,
            success: function (res) {
              wx.switchTab({
                url: '/pages/index/index' 
              })



            }
          })
        },


        fail: function (res) {
          // 转发失败
        }
      }
    }

  }
})