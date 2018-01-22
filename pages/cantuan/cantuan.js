// pages/cantuan/cantuan.js
var countDownUtl = require("../../utils/countDownUtil.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
   tim:'',
   pingtuan:[],
   num:''
  },
  Offered: function (e) {
    var that = this;
    console.log(e)
    // var id = e.target.id

    getApp().globalData.offered = e.target.id;
    const index = e.currentTarget.dataset.index;
    let pingtuan = this.data.pingtuan;
    var open = pingtuan[index].openid
    console.log(open)
    var openid = getApp().globalData.id
    console.log(openid)
    if (openid != open) {
      wx.navigateTo({

        url: '../Offered/Offered'

      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请参加别人的拼团',
        showCancel: false

      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var id = this.options.id
    var totalMsec = 86400000
    countDownUtl.countDown(totalMsec, 1000, function (res) {
      //console.log(res)
      that.setData({

        tim: res
      })
    })
    wx.request({
      url: 'https://shop.mqvt6.cn/public/index.php/index/Goods/gdorders',
      data: { id: id },
      header: {
        'content-type': 'application/json' //
      },
      success: function (res) {
        that.setData({
          pingtuan: res.data.data
        })
        that.setData({
          num: res.data
        })

        var timestamp = new Date().getTime();



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