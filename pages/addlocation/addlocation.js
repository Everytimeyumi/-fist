var bmap = require('../../utils/bmap-wx.js')
var wxMarkerData = [];
//获取应用实例
var app = getApp()
Page({
  data: {
    ak: "zBQNzZcuNllm0IcDzLMmEKTFkQs20VDi",
    markers: [],
    longitude: '',   //经度    
    latitude: '',    //纬度    
    diwei: '',     //地址    

    // provinces: [],
    // citys: [],
    // districts: [],

    // selProvinceIndex: 0,
    // selCityIndex: 0,
    // selDistrictIndex: 0

  },
  bindCancel: function () {
    wx.navigateBack({})
  },
  location: function (res) {
    var that = this
    wx.getLocation(
      {
        success: function (res) {
          console.log(res.longitude)
          console.log(res.latitude)
          that.setData({

            longitude: res.longitude,
            latitude: res.latitude
          })
        }
      })
    var BMap = new bmap.BMapWX({
      ak: that.data.ak
    });
    var fail = function (data) {
      console.log(data);
    };
    var success = function (data) {
      //返回数据内，已经包含经纬度    
      console.log(data);
      //使用wxMarkerData获取数据    
      wxMarkerData = data.wxMarkerData;
      //把所有数据放在初始化data内    
      that.setData({
        markers: wxMarkerData,
        latitude: wxMarkerData[0].latitude,
        longitude: wxMarkerData[0].longitude,
        diwei: wxMarkerData[0].address,

      });
    }
    // 发起regeocoding检索请求     
    BMap.regeocoding({
      fail: fail,
      success: success
    });
  },
  bindSave: function (e) {
    console.log(e)
    var that = this;
    var linkMan = e.detail.value.linkMan;
    var address = e.detail.value.address;
    var mobile = e.detail.value.mobile;
    var diwei = e.detail.value.diwei;
    console.log(getApp().globalData.id)
    console.log(linkMan)
    console.log(address)
    console.log(mobile)
    console.log(diwei)

    if (linkMan == "") {
      wx.showModal({
        title: '提示',
        content: '请填写联系人姓名',
        showCancel: false
      })
      return
    }
    if (mobile == ""&&mobile.length<11) {
      wx.showModal({
        title: '提示',
        content: '请11位数手机号码',
        showCancel: false
      })
      return
    }
    if (diwei == "") {
      wx.showModal({
        title: '提示',
        content: '请填写地址',
        showCancel: false
      })
      return
    }

    if (address == "") {
      wx.showModal({
        title: '提示',
        content: '请填写详细地址',
        showCancel: false
      })
      return
    }

    wx.request({
      url: 'https://shop.mqvt6.cn/public/index.php/index/Discus/addr',
      data: {
        openid: getApp().globalData.id,
        forms: diwei,
        sname: linkMan,
        addrs: address,
        phone: mobile,
      },
      success: function (res) {
        let id=res.data.data
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000,
          success: function (res) {
           
            wx.redirectTo({

              url: '/pages/payment/payment?id=' + id

            })
           
          }
        })


      }
    })
  },



})
