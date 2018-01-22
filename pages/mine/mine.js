// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pic: "",
    name: "",
    
  },
  indent: function (event) {
    var that = this


    var id = event.target.id
    console.log(id);

    wx.navigateTo({

      url: '/pages/mine-list/mine-list?id=' + id

    })
  },
  shop: function (event) {
    
    var num = 1
  
    wx.navigateTo({

      url: '/pages/mine-list/mine-list?num=' + num

    })
  },
  goods: function (event) {

    var num = 2

    wx.navigateTo({

      url: '/pages/mine-list/mine-list?num=' + num

    })
  },
  achieve:function(event) {

    var num = 3

    wx.navigateTo({

      url: '/pages/mine-list/mine-list?num=' + num

    })
  },
  temp: function (event) {

    var num = 0

    wx.navigateTo({

      url: '/pages/mine-list/mine-list?num=' + num

    })
  },
  location: function (event) {
    var that = this

    var id = event.target.id
    console.log(id);

    wx.navigateTo({

      url: '/pages/shop/shop?id=' + id

    })
  },
  sale: function (event) {
    var that = this

    var id = event.target.id
    console.log(id);

    wx.navigateTo({

      url: '/pages/sale/sale?id=' + id

    })
  },
  idea: function (event) {
    var that = this

    var id = event.target.id
    console.log(id);

    wx.navigateTo({

      url: '/pages/idea/idea?id=' + id

    })
  },
  collect: function (event) {
    var that = this

    var id = event.target.id
    console.log(id);

    wx.navigateTo({

      url: '/pages/collect/collect?id=' + id

    })
  },
  // onShow() {
  //   this.getUserInfo();
  //   this.setData({
  //     version: app.globalData.version
  //   });
  //   this.getUserApiInfo();
  //   this.getUserAmount();
  //   this.checkScoreSign();
  // },
  // getUserInfo: function (cb) {
  //   var that = this
  //   wx.login({
  //     success: function () {
  //       debugger
  //       wx.getUserInfo({
  //         success: function (res) {
            
           
  //         }
  //       })
  //     }
  //   })
  // },
  
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (res) {
    var that=this
    that.setData({
      userInfo: getApp().globalData.userInfo,
    });

    
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
  
  },
  //  globalData: {
  //   userInfo: null,
  //   id: "",
  //   name: "",
  //   pic: ""
  // }
})