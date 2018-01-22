



// pages/shop/shop.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop: []

  },

  addpay: function (event) {
    var that = this

    var id = event.currentTarget.id


    wx.redirectTo({

      url: '/pages/payment/payment?id=' + id

    })
  },
  addshop: function (event) {
    // var that = this

    // var id = event.target.id
    // console.log(id);

    wx.redirectTo({

      url: '/pages/addlocation/addlocation'

    })
  },
  redact: function (event) {
    var that = this

    var id = event.target.id
    console.log(id);

    wx.navigateTo({

      url: '/pages/redact/redact?id=' + id

    })
  },
  remove: function (event) {
    var that = this

    var id = event.target.id
    console.log(id);
    wx.request({
      url: 'https://shop.mqvt6.cn/public/index.php/index/Discus/deletaddr',
      data: { id: id },
      header: {
        'content-type': 'application/json' //
      },
      success: function (res) {
        console.log(res)
        wx.request({
          url: 'https://shop.mqvt6.cn/public/index.php/index/Discus/selecaddr',
          data: { openid: getApp().globalData.id },
          header: {
            'content-type': 'application/json' //
          },
          success: function (res) {

            console.log(res.data)
            that.setData({
              shop: res.data.data
            })

          }

        })



      }

    })

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://shop.mqvt6.cn/public/index.php/index/Discus/selecaddr',
      data: { openid: getApp().globalData.id },
      header: {
        'content-type': 'application/json' //
      },
      success: function (res) {

        console.log(res.data)
        that.setData({
          shop: res.data.data
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