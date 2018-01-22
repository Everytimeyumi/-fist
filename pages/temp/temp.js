// pages/temp/temp.js
var countDownUtl = require("../../utils/countDownUtil.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop: [],
    comment: [],
    pingtuan: [],
    num: [],
    commentNub: '',
    tim: '',
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    userInfo: {},
    pageIndex: 0,
    pageSize: 20,
    hasMore: true,
    list: [],
    banner: [],


  },
  group: function (event) {
    var that = this;
    console.log(event)
    var id = event.currentTarget.id
    console.log(id)
    
    // getApp().globalData.time = event.target.id;

    wx.redirectTo({

      url: '/pages/temp/temp?id=' + id

    })
  },
  formSubmit: function (e) {
    console.log(e)
    console.log(getApp().globalData.id)
    console.log(e.detail.formId)
    getApp().globalData.formId = e.detail.formId;
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

  cantuan: function (e) {
    var that = this;
    var id = e.target.id
    console.log(id);
    console.log("hah")
    wx.navigateTo({

      url: '../cantuan/cantuan?id=' + id

    })
  },
  shoucang: function (e) {
    var that = this;
    //console.log(e)
    var id = e.currentTarget.id
    //console.log(id);
    wx.request({
      url: 'https://shop.mqvt6.cn/public/index.php/index/Collect/addcollect',
      data: {
        gid: id,
        openid: getApp().globalData.id,

      },
      header: {
        'content-type': 'application/json' //
      },
      success: function (res) {
        console.log(res)
        //this.image.url('../images/home / zhe.svg')
        if (res.data.code != 3) {
          wx.showModal({
            title: '提示',
            content: '收藏成功',
            showCancel: false
          })
        }
        else {
          wx.showModal({
            title: '提示',
            content: '不能重复收藏',
            showCancel: false
          })
        }




      }

    })


  },
  kefu: function (e) {
    var that = this;
    var id = e.target.id
    // console.log(id);
    // console.log("hah")
    // wx.navigateTo({



    // })
  },
  examine: function (e) {
    var that = this;
    var id = e.target.id
    console.log(id);
    console.log("hah")
    wx.navigateTo({

      url: '../comment/comment?id=' + id

    })
  },

  temp: function (e) {
    var that = this;

    var id = e.target.id
    console.log(id)
    getApp().globalData.time = e.target.id;
    wx.navigateTo({

      url: '../payment/payment'

    })
  },
  Offered: function (e) {
    var that = this;
    console.log(e)
    // var id = e.target.id
    console.log(e.target.id)
    var offered = e.currentTarget.id;
    getApp().globalData.offered = offered
   console.log(offered)
   // 商品id
   // 订单id
   
    const index = e.currentTarget.dataset.index;
    let pingtuan = this.data.pingtuan;
   
    console.log(pingtuan)
    var open = pingtuan[index].openid
    var didan = pingtuan[index].id
    
    getApp().globalData.didan=didan
    console.log(didan)
    console.log(open)
    var openid = getApp().globalData.id
    console.log(e.target.id)
    if (openid != open) {
      wx.navigateTo({

        url: '../Offered/Offered?offered=' + offered+'&didan='+didan

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
    var that = this
    var totalMsec = 86400000
    countDownUtl.countDown(totalMsec, 1000, function (res) {
      //console.log(res)
      that.setData({

        tim: res
      })
    })



    wx.request({
      url: 'https://shop.mqvt6.cn/public/index.php/index/Goods/good',
      data: { id: id },
      header: {
        'content-type': 'application/json' //
      },
      success: function (res) {


        console.log(res.data)


        that.setData({
          shop: res.data.data,
          banner: res.data.count
        })

      }

    })
    wx.request({
      url: 'https://shop.mqvt6.cn/public/index.php/index/Goods/gddisc',
      data: { id: id },
      header: {
        'content-type': 'application/json' //
      },
      success: function (res) {

        // var str = res.data.data[3].info;
        // str = str.split('')

        // str = str.slice(0, 3)

        //console.log(str);

        // console.log(res.data)
        console.log(res.data)

        that.setData({
          comment: res.data.data,

        })

      }

    })
    wx.request({
      url: 'https://shop.mqvt6.cn/public/index.php/index/Goods/gddcount',
      data: { id: id },
      header: {
        'content-type': 'application/json' //
      },
      success: function (res) {


        console.log(res.data)

        that.setData({
          commentNub: res.data.data

        })

      }

    })
    wx.request({
      url: 'https://shop.mqvt6.cn/public/index.php/index/Goods/gdorder',
      data: { id: id },
      header: {
        'content-type': 'application/json' //
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          pingtuan: res.data.data
        })
        that.setData({
          num: res.data
        })

     //   var timestamp = new Date().getTime();



      }



    })
    wx.request({
      url: 'https://shop.mqvt6.cn/public/index.php/index/Index/randgood',
      data: {},
      header: {
        'content-type': 'application/json' //
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          list: res.data.data
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
    console.log(res)
    var id = res.target.id
    console.log(id)
    return {
      title: '您的好友邀请你来拼团',
      path: '/pages/temp/temp?id=' + id,
      // imageUrl:'http://shops.mqvt6.cn/pingpingshen.jpg',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  // globalData: {
  //   time:"",

  // }
})