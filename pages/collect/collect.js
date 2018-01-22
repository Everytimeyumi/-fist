// pages/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: []
  },
  group: function (event) {
    var that = this;

    var id = event.target.id
   // getApp().globalData.time = event.target.id;
    wx.navigateTo({

      url: '../temp/temp?id='+id

    })


  },
  delete: function (event) {
    var that = this;

    var id = event.target.id
    wx.request({
      url: 'https://shop.mqvt6.cn/public/index.php/index/Collect/deletacollect',
      data: {
        id: id
      },
      header: {
        'content-type': 'application/json' //
      },
      success: function (res) {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();

        console.log(res.data)




      }

    })


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(getApp().globalData.id)
    var that = this
    wx.request({
      url: 'https://shop.mqvt6.cn/public/index.php/index/Collect/selectcollect',
      data: {
        openid: getApp().globalData.id,
      },
      header: {
        'content-type': 'application/json' //
      },
      success: function (res) {


        console.log(res.data)
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
  onShareAppMessage: function () {

  }
})