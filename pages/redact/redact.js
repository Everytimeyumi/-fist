var bmap = require('../../utils/bmap-wx.js')
var wxMarkerData = [];
//获取应用实例
var app = getApp()
Page({
  data: {
    redact:[],
    ak: "zBQNzZcuNllm0IcDzLMmEKTFkQs20VDi",
    markers: [],
    longitude: '',   //经度    
    latitude: '',    //纬度    
    diwei: '',     //地址 
    address: '',
    mobile: '',
    id:'',
     

    provinces: [],
    citys: [],
    districts: [],

    selProvinceIndex: 0,
    selCityIndex: 0,
    selDistrictIndex: 0

  },
  bindCancel: function () {
    wx.navigateBack({})
  },
  location: function (res) {
    var that = this
    wx.getLocation(
      {
        success: function (res) {
          // console.log(res)
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
      // console.log(data);
    };
    var success = function (data) {
      //返回数据内，已经包含经纬度    
      // console.log(data);
      //使用wxMarkerData获取数据    
      wxMarkerData = data.wxMarkerData;
      //把所有数据放在初始化data内    
      that.setData({
        markers: wxMarkerData,
        latitude: wxMarkerData[0].latitude,
        longitude: wxMarkerData[0].longitude,
        diwei: wxMarkerData[0].address,
        cityInfo: data.originalData.result.addressComponent
      });
    }
    // 发起regeocoding检索请求     
    BMap.regeocoding({
      fail: fail,
      success: success
    });
  },
  bindSave: function (e) {
    var that = this;
    // console.log(e.target)
    var id = e.target.id
     
   
    var linkMan = e.detail.value.linkMan;
    var address = e.detail.value.address;
    var mobile = e.detail.value.mobile;
    var diwei = e.detail.value.diwei;
    

    if (linkMan == "") {
      wx.showModal({
        title: '提示',
        content: '请填写联系人姓名',
        showCancel: false
      })
      return
    }
    if (mobile == "") {
      wx.showModal({
        title: '提示',
        content: '请填写手机号码',
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
    console.log(linkMan)
    console.log(address)
    console.log(mobile)
    console.log(diwei)
    console.log(id)

    wx.request({
      url: 'https://shop.mqvt6.cn/public/index.php/index/Discus/upadates',
      method:'POST',
      data: {
        id:id,
        sname: linkMan,
        phone: mobile,
        forms: diwei,
        addrs: address,
        
      },
      success: function (res) {
       
        console.log(res.data)
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 20000,
          
          success:function(res){
            wx.navigateTo({

              url: '/pages/shop/shop'

            })
          }
        }) 

        
      }
    })
    // console.log(linkMan)
    // console.log(address)
    // console.log(mobile)
    // console.log(diwei)

  },

  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    var id = this.options.id
    that.setData({
      id: id
    })
    // console.log(id)

    wx.request({
      url: 'https://shop.mqvt6.cn/public/index.php/index/Discus/selects',
      data: { id: id },
      header: {
        'content-type': 'application/json' //
      },
      success: function (res) {
        
         that.setData({
           linkMan: res.data.data.sname,
           address: res.data.data.addrs,
           mobile: res.data.data.phone,
           diwei: res.data.data.forms,

         })
     

      
        
        

      }

    })
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
