
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    banner: [],
    indicatorDots: true,

    autoplay: true,
    interval: 5000,
    duration: 1000,
    userInfo: {},
     hasUserInfo: false,
    pageIndex: 0,
    pageSize: 20,
    hasMore: true


  },
  // loadMore() {
  //   if (!this.data.hasMore) return

  //   let { pageIndex, pageSize } = this.data
  //   const params = { _page: ++pageIndex, _limit: pageSize }
  //   return fetch(`categories/${this.data.category.id}/shops`, params)
  //     .then(res => {
  //       const totalCount = parseInt(res.header['X-Total-Count'])
  //       const hasMore = pageIndex * pageSize < totalCount
  //       const shops = this.data.shops.concat(res.data)
  //       this.setData({ shops, pageIndex, hasMore })
  //     })
  // },

  formSubmit: function (e) {
    console.log(e)
    console.log(getApp().globalData.id)
    console.log(e.detail.formId)
   
    wx.request({
      url: 'https://shop.mqvt6.cn/public/index.php/index/Formid/index',
      headers: { 'Content-Type': 'application/json' },

      data: {
        openid: getApp().globalData.id,
        fromid: e.detail.formId,
      
      },
      success: function (res) {
       
      }
    })

  },
  group: function (event) {
    var that = this;
    var id = event.target.id
    
    // getApp().globalData.time = event.target.id;

    wx.navigateTo({

      url: '/pages/temp/temp?id=' + id

    })
  },

  wxpay: function (res) {
     var that = this
     var time = "橘子"
    wx.login({
      success: function (res) {
        // console.log(getApp().globalData.id)
        console.log(res.code+11);
        wx.request({
          url:'https://shop.mqvt6.cn/wxpai/example/jsapi.php',
          //  method: "GET",
          data: { 
            code: res.code,
            // title:time,
            // price:1
            
           },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(res.data)
            var data = res.data
            // wx.requestPayment({
            //   'timeStamp': data.timeStamp,
            //   'nonceStr': data.nonceStr,
            //   'package': data.package,
            //   'signType': 'MD5',
            //   'paySign': data.paySign,
            //   'success': function (res) {
            //     console.log("支付成功")
            //   },
            //   'fail': function (res) {
            //   }
            // })
          }
        })
      }
    })





  },
  


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

    var that = this



    wx.request({
      url: 'https://shop.mqvt6.cn/public/index.php/index/Goods/index',
      data: {
       pas:1
      },
      header: {
        'content-type': 'application/json' //
      },
      success: function (res) {

        // var str = res.data.data[3].info;
        // str = str.split('')

        // str = str.slice(0, 3)
       console.log(res.data.data)
        that.setData({
          list: res.data.data,
         
        })

      }

    })


    wx.request({
      url: 'https://shop.mqvt6.cn/public/index.php/index/index/img',
      data: {},
      header: {
        'content-type': 'application/json' //
      },
      success: function (res) {

        console.log(res.data.data)
        that.setData({
          banner: res.data.data
        })

      }

    })


  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (res) {
    // wx.login({
    //   success: function (res) {

    //     console.log(res);

    //     wx.request({
          
    //       url:'https://shop.mqvt6.cn/public/index.php/index/User/user',
    //       data: { code: res.code },
    //       header: { 'Content-Type': 'application/json' },
    //       success: function (res) {
    //         console.log(res)
    //         getApp().globalData.id = res.data.openid;
    //          getApp().globalData.userInfo = res.userInfo;
    //         console.log(getApp().globalData.userInfo+111)
    //         console.log(getApp().globalData.id+1111)

    //         // wx.getUserInfo({
    //         //   success: function (res) {
    //         //     console.log(res)
    //         //     // var userInfo = res.userInfo
    //         //     // var nickName = userInfo.nickName
    //         //     // var avatarUrl = userInfo.avatarUrl
    //         //     // var gender = userInfo.gender 
    //         //     // var province = userInfo.province
    //         //     // var city = userInfo.city
    //         //     // var country = userInfo.country
               
    //         //     getApp().globalData.userInfo = res.userInfo;
    //         //     console.log(getApp().globalData.userInfo+11111111111111111111111111111111111)
    //         //   }
    //         // })


    //       }
    //     })

    //   }
    // })


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
    // this.setData({ list: [], pageIndex: 0, hasMore: true })
    // this.loadMore().then(() => wx.stopPullDownRefresh())
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
    console.log('到底了，别拉了')
    this.loadMore()
  }
})