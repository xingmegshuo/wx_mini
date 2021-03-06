const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}




function send_request(url,data,header,method, callback){
  // url 请求地址 data json发送数据 header jwt秘钥，不携带可以为空 method 请求方式 callback 回调函数
  var url = 'https://www.menguoli.com/'+url+'/';
  // console.log(url)
  wx.request({
    url: url,
    method: method,
    data:data,
    header: {
      'content-type': 'application/json',
      'Authorization':'Bearer '+header,
    },
    dataType:'json',
    complete:function(res){
      return typeof callback =='function' && callback(res.data)
    } 
  })
}




module.exports = {
  formatTime: formatTime,
  send_request:send_request,
}

