App({
  data: {
   // userInfo: {},
   // hasUserInfo: false,
  },
 
  onLaunch: function () {
    
    
    wx.login({
      success: function (res) {
        
        console.log(res);
        
        wx.request({
          url: 'https://shop.mqvt6.cn/public/index.php/index/User/user',
          data: { code:res.code},
          header: { 'Content-Type': 'application/json' },
          success: function (res) {
            console.log(res.data.openid)
            getApp().globalData.id = res.data.openid;
            // getApp().globalData.userInfo = res.userInfo;
            // console.log(getApp().globalData.userInfo)
            //console.log(getApp().globalData.id)

            wx.getUserInfo({
              success: function (res) {
                var userInfo = res.userInfo
                var nickName = userInfo.nickName
                var avatarUrl = userInfo.avatarUrl
                var gender = userInfo.gender 
                var province = userInfo.province
                var city = userInfo.city
                var country = userInfo.country
                
                getApp().globalData.userInfo = res.userInfo;
               
                console.log(getApp().globalData.userInfo)
                wx.request({
                  url: 'https://shop.mqvt6.cn/public/index.php/index/User/index',
                  data: {
                    openid: getApp().globalData.id,
                    username: nickName,
                    sex: gender,
                    picurl:avatarUrl,

                  },
                  header: { 'Content-Type': 'application/json' },
                  success: function (res) {
                  }
                })
              }
            })


          }
        })

      }
    })
    

    
    

    
  },
  // getUserInfo: function (cb) {
  //   var that = this;
  //   if (this.globalData.userInfo) {
  //     typeof cb == "function" && cb(this.globalData.userInfo)
  //   } else {
  //     //调用登录接口  
  //     wx.login({
  //       success: function () {
  //         wx.getUserInfo({
  //           success: function (res) {
  //             that.globalData.userInfo = res.userInfo;
  //             console.log(that.globalData.userInfo)
  //              typeof cb == "function" && cb(that.globalData.userInfo)
  //           }
  //         })
  //       }
  //     });
  //   }
  // },
 
  // getUserInfo: function (e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   getApp().globalData.name = e.detail.userInfo.nickName
  //   getApp().globalData.pic = e.detail.userInfo.avatarUrl
  //   console.log(getApp().globalData.name)
  //   console.log(getApp().globalData.pic)
  //   this.setData({
  //     userInfo: e.detail.userInfo,
     

  //   })
  // },
  


  globalData: {
    userInfo: null,
    id: "",
    name: "",
    pic: ""
  }
  
})
