// pages/share/share.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: [],
    openid: '',
    oid: '',
    offered: ''

  },
  // Offered: function (e) {
  //   var that = this;
  //   // console.log(e)
  //   var open = this.data.openid
  //   // console.log(open)

    
  //   var offered = this.data.offered
  //   getApp().globalData.offered = offered
  //   var openid = getApp().globalData.id
  //   console.log(openid)
  //   // console.log(e.target.id)

  //   wx.navigateTo({

  //     url: '../Offered/Offered?' 

  //   })


  // },
  Offered: function (e) {
    var that = this;
    var open = this.data.openid
    console.log(open)
    var offered = this.data.offered
    var oid = this.data.oid
    getApp().globalData.offered = offered 
    getApp().globalData.oid = oid
    console.log(oid)
    var openid = getApp().globalData.id
    console.log(openid)
    // console.log(e.target.id)
    if (openid != open) {
      wx.navigateTo({

        url: '../yaoqing/yaoqing'

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


    var offered = this.options.id
    
    that.setData({
      offered: this.options.id
    })
    var openid = that.options.openid
    var oid = that.options.oid

     console.log(oid)
    that.setData({
      oid: oid
    })

    // console.log(openid)
    that.setData({
      openid: openid
    })

    wx.request({
      url: 'https://shop.mqvt6.cn/public/index.php/index/Goods/good',
      data: {
        id: offered
      },
      header: {
        'content-type': 'application/json' //
      },
      success: function (res) {
        that.setData({
          time: res.data.data
        })
      }

    })
    // var openid = this.options.openid
    // console.log(openid)
    wx.request({
      url: 'https://shop.mqvt6.cn/public/index.php/index/User/userinfo',
      data: {
        openid: openid
      },

      header: {
        'content-type': 'application/json' //
      },
      success: function (res) {
        //  console.log(res.data.data)
        that.setData({
          url: res.data.data
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