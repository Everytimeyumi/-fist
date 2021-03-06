
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: [],
    carts: { num: 1, selected: false },
    total: 0,
    didan: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  formSubmit: function (e) {
    console.log(e)
    console.log(getApp().globalData.id)
    console.log(e.detail.formId)

    getApp().globalData.formId = e.detail.formId

  },
  selectList(e) {

    let carts = this.data.carts;

    const selected = carts.selected;
    carts.selected = !selected;
    console.log(selected)
    this.setData({
      carts: carts

    });
    this.getTotalPrice();
  },
  add: function (event) {
    // var that = this;
    // var id = event.target.id
    // console.log(id);

    wx.redirectTo({

      url: '/pages/yaoqing1/yaoqing1'

    })
  },
  // wxpay(e) {
  //   varid = getApp().globalData.id
  //   var time = getApp().globalData.time
  //   let selected = this.data.carts.selected;
  //   let price = this.data.total
  //   let num = this.data.carts.num
  //   if (selected) {
  //     wx.request({
  //       url: 'https://shop.mqvt6.cn/public/index.php/index/Shops/addorders',
  //       data: {
  //         id: time,
  //         openid: id,
  //         price: price,
  //         aid: locationid,
  //         num: num,

  //       },
  //       header: {
  //         'content-type': 'application/json' //
  //       },
  //       success: function (res) {
  //         console.log(res.data)
  //         that.setData({
  //           time: res.data.data
  //         })
  //       }

  //     })

  //   } else {
  //     wx.showModal({
  //       title: '提示',
  //       content: '请选择商品',
  //       showCancel: false
  //     })
  //   }


  // },
  pay(e) {
    var oid = getApp().globalData.oid
    console.log(oid)
    var locationid = this.options.id
    // console.log(locationid)
    var time = getApp().globalData.time
    let selected = this.data.carts.selected;
    var money = this.data.total
    let price = this.data.total * 100
    // console.log(price)
    let num = this.data.carts.num
    let title = this.data.time.title;
    // console.log(title);

    if (selected) {
      if (locationid != null) {
        wx.login({
          success: function (res) {
            // console.log(res.code);
            wx.request({
              url: 'https://shop.mqvt6.cn/wxpai/example/jsapi.php',
              method: "GET",
              data: {
                code: res.code,
                price: price,
                title: title,

              },
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                // console.log(res)
                var data = res.data
                var order = res.data.order
                // console.log(order)
                // console.log(getApp().globalData.offered + 11111)
                wx.requestPayment({
                  'package': data.package,
                  'timeStamp': data.timeStamp,
                  'nonceStr': data.nonceStr,
                  'package': data.package,
                  'signType': 'MD5',
                  'paySign': data.paySign,
                  'success': function (res) {
                    // console.log(res)
                    // console.log("支付成功")

                    wx.request({
                      url: 'https://shop.mqvt6.cn/public/index.php/index/Shops/addorder',
                      data: {
                        id: getApp().globalData.offered,
                        oid: getApp().globalData.oid,
                        openid: getApp().globalData.id,
                        prices: price,
                        aid: locationid,
                        num: num,
                        code: order,


                      },
                      header: {
                        'content-type': 'application/json' //
                      },
                      success: function (res) {
                        //  console.log(res)

                        //    console.log(res)
                        wx.showModal({
                          title: '提示',
                          content: '支付成功',
                          showCancel: false,
                          success: function (res) {
                            // console.log(oid)
                            // wx.switchTab({

                            //   url: '/pages/index/index'

                            // })
                            wx.request({ 
                              url: 'https://shop.mqvt6.cn/public/index.php/index/Index/logintz',
                              headers: { 'Content-Type': 'application/json' },

                              data: {
                                openid: getApp().globalData.id,
                                fromid: getApp().globalData.formId,
                                title: title,
                                prices: money,
                                orders: order,


                              },
                              success: function (res) {
                                wx.switchTab({

                                  url: '/pages/index/index'

                                })
                              }
                            })
                          }
                        })

                      }

                    })


                  },
                  'fail': function (res) {
                  }
                })
              }
            })
          }
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '请添加收货地址',
          showCancel: false
        })
      }


    } else {
      wx.showModal({
        title: '提示',
        content: '请选择商品',
        showCancel: false
      })
    }






  },

  addCount(e) {


    let carts = this.data.carts;
    // num=carts.num
    // console.log(carts)
    // console.log(carts.num)
    let num = this.data.carts.num

    num = num + 1;
    carts.num = num;
    // console.log(num)
    // console.log(carts)
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },

  minusCount(e) {

    let carts = this.data.carts;
    let num = this.data.carts.num
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    carts.num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },
  /**
  * 计算总价
  */
  getTotalPrice() {
    let carts = this.data.carts;
    let price = this.data.time.tgprice;
    // console.log(price)
    let f = 0;

    if (carts.selected) {
      f += Math.round(carts.num * price * 100) / 100;
      var total = f.toString();
      var rs = total.indexOf('.');
      if (rs < 0) {
        rs = total.length;
        total += '.';

      }
      while (total.length <= rs + 2) {
        total += '0';
      }
    }

    // console.log(total)

    this.setData({

      total: total
    });
  },
  onLoad: function (options) {
    var that = this
    console.log(options)
    var locationid = this.options.id
    var offered = getApp().globalData.offered
    var didan = getApp().globalData.didan
    console.log(offered)
    console.log(didan)
    that.setData({
      didan: didan
    })
    console.log(offered)
    console.log(didan)


    wx.request({
      url: 'https://shop.mqvt6.cn/public/index.php/index/Goods/good',
      data: {
        id: offered
      },
      header: {
        'content-type': 'application/json' //
      },
      success: function (res) {
        // console.log(res.data)
        that.setData({
          time: res.data.data
        })
      }

    })

    wx.request({
      url: 'https://shop.mqvt6.cn/public/index.php/index/Discus/selects',
      data: { id: locationid },
      header: {
        'content-type': 'application/json' //
      },
      success: function (res) {

        // console.log(res.data.data)
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