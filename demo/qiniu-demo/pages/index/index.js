
const qiniuUploader = require("../../utils/qiniuUploader");
//index.js
// var uploadtoken = 'JA6HBIzk65hYMUyzP5jDPyea65_iPwDaxBDl632N:1ZDJNr9MQz0h1WFUoQMMQ91iEXI=:ewogICJzY29wZSIgOiAicGVuZ21pIiwKICAiZGVhZGxpbmUiIDogMTUwMDU0ODQxMQp9';
var uploadtoken = 'JA6HBIzk65hYMUyzP5jDPyea65_iPwDaxBDl632N:jiwpBvc8_3YDF84_rZzPiWc5lFk=:eyJzY29wZSI6InBlbmdtaSIsImRlYWRsaW5lIjoxNTAwNTg4Mzc4fQ=='

var qiniuhelper = require("../../utils/qiniuhelper.js");
var CryptoJS = require("../../utils/crypto-js.js");


// 初始化七牛相关参数
function initQiniu() {
  var options = {
    region: 'ECN', // 华北区
    // uptokenURL: 'https://[yourserver.com]/api/uptoken',
    // uptoken: 'xxxx',
    domain: 'http://7xicym.com1.z0.glb.clouddn.com',
    shouldUseQiniuFileName: false,
    uptoken:uploadtoken,
  };
  qiniuUploader.init(options);
}

//获取应用实例
var app = getApp()
Page({
  data: {
    imageObject: {}
  },
  //事件处理函数
  onLoad: function () {
    console.log('onLoad')
    var that = this;
  },
  didPressChooesImage: function() {
    var that = this;
    didPressChooesImage(that);
  },
  genneruptoken:function(){

    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    console.log("当前时间戳为：" + timestamp);  
    timestamp = timestamp + 60*24*10;//十分钟有效期

    var accessKey = 'JA6HBIzk65hYMUyzP5jDPyea65_iPwDaxBDl632N';
    var secretKey = 'F1-D3cvoj7PioZxmAlrfGciA-3fZOrZIQZ-nRTGE';
    var putPolicy = {"scope":"pengmi","deadline":1500607768}; 
    uploadtoken = qiniuhelper.genToken(accessKey, secretKey, putPolicy);
 
  },

});

function didPressChooesImage(that) {
  initQiniu();
  // 微信 API 选文件
  wx.chooseImage({
      count: 1,
      success: function (res) {
        var filePath = res.tempFilePaths[0];
        // 交给七牛上传
        var fileName = filePath.split('//')[1];
        qiniuUploader.upload(filePath, (res) => {
          that.setData({
            'imageObject': res,
          });
        }, (error) => {
          console.error('error: ' + JSON.stringify(error));
        },{
          key:'wxapp/'+fileName,
          region:'ECN'
        } 
        );
      }
    })
    
}