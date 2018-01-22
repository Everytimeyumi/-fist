function formatTime(date) {
  var year = date.getFullYear()
  console.log(year)
  var month = date.getMonth() + 1
  console.log(month)
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
   return [year, month, day,hour,minute,second]
  
   
}

function formatNumber(n) {
  n = n.toString()   
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}
