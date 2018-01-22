
var app = getApp()
Page({
  data: {
    statusType: ["待拼团", "待发货", "待收货", "已完成", "退货订单"],
    currentType: 0,
    tabClass: ["", "", "", "", ""],
    list:[],
    timet:''
  },
  formSubmit: function (e) {
    console.log(e)
    console.log(getApp().globalData.id)
    console.log(e.detail.formId)

    getApp().globalData.formId = e.detail.formId

  },
  pingjia:function(e){
    var index =e.currentTarget.dataset.index;
    var gid=this.data.list[index].gid
    var id = e.currentTarget.id
    wx.navigateTo({

      url: '/pages/evaluate/evaluate?id=' + id+'&gid='+gid

    })
    
  },
  tuidan: function (e) {
    var index = e.currentTarget.dataset.index;
    var title = this.data.list[index].title
    var order = this.data.list[index].code
     var money=this.data.list[index].prices
    var prices = this.data.list[index].prices*100
    var tprices = this.data.list[index].prices*100
    var id = this.data.list[index].id
   
  //console.log(order)
  //console.log(prices)
 // console.log(tprices)
  wx.request({
     url: 'https://shop.mqvt6.cn/wxpai/lib/Wxtk.php',
    //url:'https://shop.mqvt6.cn/public/index.php/index/index/img
    methob: "GET",
    data: {
     order:order,
     prices:prices,
     tprices:tprices,
    },
    header: {
      'content-type': 'application/json' //
    },
    success: function (res) {
      console.log(res)

      if (res.data.info == 'yes') {
        wx.request({
          url: 'https://shop.mqvt6.cn/public/index.php/index/Order/deletorder',
          methob: "POST",
          data: {
            id: id,
          },
          success: function (res) {
          
           
             
                 wx.showModal({
              title: '提示',
              content: '退单成功',
              showCancel: false,
              success: function (res) {
                
                wx.request({
                  url: 'https://shop.mqvt6.cn/public/index.php/index/Index/refund',
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

                      url: '/pages/mine/mine'

                    })
                  }
                })
              }
            })
             
           
          }
          
        })
        

      }else{
        wx.showModal({
          title: '提示',
          content: '退单失败如有问题请联系客服',
          showCancel: false,
          success: function (res) {
            wx.switchTab({

              url: '/pages/mine/mine'

            })
          }
        })

      }

    }

  })

  },

  shouhuo: function (e) {

    var id = e.currentTarget.id
    wx.request({
      url: 'https://shop.mqvt6.cn/public/index.php/index/Shops/okorder',
      methob: "POST",
      data: {
        id: id,
      },
      header: {
        'content-type': 'application/json' //
      },
      success: function (res) {
       // console.log(res)
        if (res.code = 1) {
          wx.showModal({
            title: '提示',
            content: '确认收货成功',
            showCancel: false,
            success: function (res) {
              wx.switchTab({

                url: '/pages/mine/mine'

              })
            }
          })

        }

      }

    })

  },
  tuihuo:function(e) {
    
    var id = e.currentTarget.id
    wx.request({
      url: 'https://shop.mqvt6.cn/public/index.php/index/Order/indext',
      methob: "POST",
      data: {
        id: id,
      },
      header: {
        'content-type': 'application/json' //
      },
      success: function (res) {
      // console.log(res)
       if (res.code = 1) {
         wx.showModal({
           title: '提示',
           content: '退货成功',
           showCancel: false,
           success: function (res) {
             wx.switchTab({

               url: '/pages/mine/mine'

             })
           }
         })
        
       }

      }

    })
    
  },
  statusTap: function (e) {
    var curType = e.currentTarget.dataset.index;
    this.data.currentType = curType
    this.setData({
      currentType: curType
    });
    this.onShow();
  },
 
  onLoad: function (options) {
   // console.log(options)
    var that=this
    
    
   
   if(options.num===undefined){
     this.setData({
       currentType:0
     })
   }else {
     var index = options.num
     //console.log(index)
     this.setData({
       currentType:index 
     })
     var index = this.data.currentType;
     
     //console.log(index)
     
    // console.log(getApp().globalData.id, )
     if (index == 0) {
       wx.request({
         url: 'https://shop.mqvt6.cn/public/index.php/index/Selectorder/dpoder',
         methob: "POST",
         data: {
           openid: getApp().globalData.id,
         },
         header: {
           'content-type': 'application/json' //
         },
         success: function (res) {
           //console.log("这是第一条")
           //console.log(res.data)
           that.setData({
             list: res.data.data
           })



         }

       })
     }

     else if (index == 1) {
       wx.request({
         url: 'https://shop.mqvt6.cn/public/index.php/index/Selectorder/dfoder',
         data: {
           openid: getApp().globalData.id,
         },
         header: {
           'content-type': 'application/json' //
         },
         success: function (res) {
          
           that.setData({
             list: res.data.data
           })



         }

       })
     } else if (index ==2) {
       wx.request({
         url: 'https://shop.mqvt6.cn/public/index.php/index/Selectorder/foder',

         data: {
           openid: getApp().globalData.id,
         },
         header: {
           'content-type': 'application/json' //
         },
         success: function (res) {
         
           that.setData({
             list: res.data.data
           })



         }

       })
     } else if (index == 3) {
       wx.request({
         url: 'https://shop.mqvt6.cn/public/index.php/index/Selectorder/soder',
         data: {
           openid: getApp().globalData.id,
         },
         header: {
           'content-type': 'application/json' //
         },
         success: function (res) {
           
           console.log(res.data)
           if(res.data.data==null){
             console.log("这是第四条")
             that.setData({
               list: '去选购商品'
             })
           }else{
             that.setData({
               list: res.data.data
             })
           }
           



         }

       })
     } else if (index == 4) {
       wx.request({
         url: 'https://shop.mqvt6.cn/public/index.php/index/Selectorder/toder',
         data: {
           openid: getApp().globalData.id,
         },
         header: {
           'content-type': 'application/json' //
         },
         success: function (res) {
           console.log("这是第五条")
           console.log(res.data)
           that.setData({
             list: res.data.data
           })

         }

       })
     }

     else {
       
     }

     
   
    
   }
     
    
   
   
   
  // var index=options.num
  // this.setData({
  //   currentType: index
  // })
  },
  onReady: function () {

    // 生命周期函数--监听页面初次渲染完成

  },
 
  onShow: function (res) {
   
    var that=this
    var index=this.data.currentType;
    console.log(index)
    console.log(getApp().globalData.id,)
    if(index===0){
      wx.request({
        url: 'https://shop.mqvt6.cn/public/index.php/index/Selectorder/dpoder',
        methob:"POST",
        data: {
          openid: getApp().globalData.id,
        },
        header: {
          'content-type': 'application/json' //
        },
        success: function (res) {
          console.log("这是第一条")
          console.log(res.data)
          that.setData({
            list: res.data.data
          })



        }

      })
    }
    
    else if(index===1){
      wx.request({
        url: 'https://shop.mqvt6.cn/public/index.php/index/Selectorder/dfoder',
        data: {
          openid: getApp().globalData.id,
        },
        header: {
          'content-type': 'application/json' //
        },
        success: function (res) {
          console.log("这是第二条")
          console.log(res.data)
          that.setData({
            list: res.data.data
          })



        }

      })
    } else if (index === 2) {
      wx.request({
        url: 'https://shop.mqvt6.cn/public/index.php/index/Selectorder/foder',
        
        data: {
          openid: getApp().globalData.id,
        },
        header: {
          'content-type': 'application/json' //
        },
        success: function (res) {
          console.log("这是第三条")
          console.log(res.data)
          that.setData({
            list: res.data.data
          })



        }

      })
    } else if (index === 3) {
      wx.request({
        url: 'https://shop.mqvt6.cn/public/index.php/index/Selectorder/soder',
        data: {
          openid: getApp().globalData.id,
        },
        header: {
          'content-type': 'application/json' //
        },
        success: function (res) {
    
          console.log(res.data)
          if (res.data == null) {
            console.log("这是第四条")
            that.setData({
              timet: '去选购商品'
            })
          } else {
            that.setData({
              list: res.data.data
            })
          }



        }

      })
    } else if (index === 4) {
      wx.request({
        url: 'https://shop.mqvt6.cn/public/index.php/index/Selectorder/toder',
        data: {
          openid: getApp().globalData.id,
        },
        header: {
          'content-type': 'application/json' //
        },
        success: function (res) {
          console.log("这是第五条")
          console.log(res.data)
          that.setData({
            list: res.data.data
          })



        }

      })
     
    }
    
    else {
      console.log("不存在")
    }


   

  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数

  },
  onShareAppMessage: function (res) {
    // console.log(res)
    // var id = res.target.id
    // console.log(id)
    return {
      title: '您的好友邀请你来拼团',
      path: '/pages/index/index',
      imageUrl: 'http://shops.mqvt6.cn/pingpingshen.jpg',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
})