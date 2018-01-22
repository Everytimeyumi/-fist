module.exports = (url, data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: 'https://shop.mqvt6.cn/public/index.php/index/Goods/index/${url}',
      data: data,
      success: resolve,
      fail: reject
    })
  })
}
