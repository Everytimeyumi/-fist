
var app = getApp()
Page({
  data: {
    stars: [0, 1, 2, 3, 4],
    normalSrc: '../images/home/star2.png',
    selectedSrc: '../images/home/star1.png',
    // halfSrc: '../images/home/star1.png',
    key: 0,//评分
    key1:0,
    key2:0,
    imagePaths:[],
    content:'',
    id:'',
    gid:'',
    tempFilePaths:''
  },
  onLoad: function () {
  },

  selectRight: function (e) {
  //  console.log(e)
    var key = e.currentTarget.dataset.key
    if (this.data.key == 1 && e.currentTarget.dataset.key == 1) {
      //只有一颗星的时候,再次点击,变为0颗
      key = 0;
    }
  //  console.log("得" + key + "分")
    this.setData({
      key: key
    })
  },
  add: function (e) {
  //  console.log(e)
    var key1 = e.currentTarget.dataset.key
   // console.log(key1)
    if (this.data.key1 == 1 && e.currentTarget.dataset.key == 1) {
      //只有一颗星的时候,再次点击,变为0颗
      key1 = 0;
    }
  //  console.log("得" + key1 + "分")
    this.setData({
      key1: key1
    })
  },
  subtraction: function (e) {
   // console.log(e)
    var key2 = e.currentTarget.dataset.key
    if (this.data.key2 == 1 && e.currentTarget.dataset.key == 1) {
      //只有一颗星的时候,再次点击,变为0颗
      key2 = 0;
     // console.log(key2)
    }
    console.log("得" + key2 + "分")
    this.setData({
      key2: key2
    })
  },
  
  chooseimage: function (e) {
    var _this = this, id = e.currentTarget.dataset.id;

    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: [], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: [], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        var imgsrc = res.tempFilePaths[0];

       // console.log('当前id' + id);

        var newImgs = _this.data.imagePaths.concat();
       // console.log(_this.data.imagePaths.concat())

        newImgs.splice(id, 1, { src: imgsrc });
       // console.log(res.tempFilePaths[0])
        _this.setData({

          imagePaths: newImgs,
          tempFilePaths :res.tempFilePaths

        })
      }
    })

  },
  bindSave:function(e){
    var key = this.data.key
    var content = e.detail.value.linkMan;
    var id =this.data.id
    console.log(id)
    var gid = this.data.gid
    console.log(gid)
    
     var tempFilePaths = this.data.tempFilePaths
     console.log(tempFilePaths)
    console.log(tempFilePaths)
    if (this.data.tempFilePaths =='') {
      wx.request({
        url: 'https://shop.mqvt6.cn/public/index.php/index/Goods/adddisc',
        data: {
          oid: id,
          openid: getApp().globalData.id,
          gid: gid,
          text: content,
          status: key
        },
        header: {
          'content-type': 'application/json' //
        },
        success: function (e) {

          let name = e.data.data
          console.log(e)
          if (e.code = 1) {
            wx.showModal({
              title: '提示',
              content: '这是一个模态弹窗',
              success: function (res) {
              
                wx.switchTab({
                   
                    url: '/pages/mine/mine'
                  })
                
              }
            })
            
          } 

        }

      })
      
    } else {
      wx.request({
        url: 'https://shop.mqvt6.cn/public/index.php/index/Goods/adddisc',
        data: {
          oid: id,
          openid: getApp().globalData.id,
          gid: gid,
          text: content,
          status: key
        },
        header: {
          'content-type': 'application/json' //
        },
        success: function (e) {

          let name = e.data.data
          console.log(name)
          wx.uploadFile({
            url: 'https://shop.mqvt6.cn/public/index.php/index/Goods/addimg', //仅为示例，非真实的接口地址
            filePath: tempFilePaths[0],
            name: 'pling',
            formData: {
              pid: name
            },


            success: function (res) {

              console.log(res)

              if (res.code = 1) {
                wx.showModal({
                  title: '提示',
                  content: '收藏成功',
                  showCancel: false
                })
                wx.switchTab({

                  url: '/pages/mine/mine'

                })
              }
            }
          }) 

        }

      })

    }
    
  },
   onLoad: function (options) {
     var id =options.id
     console.log(id)
     this.setData({

       id: id

     })
     var gid =options.gid
     console.log(gid)
     this.setData({

       gid: gid

     })
   }
  
})

   
