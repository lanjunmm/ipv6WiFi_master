var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var uuid = require('uuid');
var handler = require('../handle/dataHandle');
const response = require('../handle/response/response');
const channelRes=require('../handle/response/channel');
/* GET home page. */  // 定义网站主页的路由
router.get('/', function(req, res, next) {
  // response.index(req, res, next);//查询数据库并将数据交给heatmap
  //   response.allId(req,res,next);
    res.render("heatmap.html",{dataList:22})
});
router.get('/name', function(req, res, next) {
    // response.index(req, res, next);//查询数据库并将数据交给heatmap
    response.allId(req,res,next);
});
router.get('/channel',function (req,res,next) {
    channelRes.channel(req,res,next);
});

router.post('/upload', function (req, res, next) {
  console.log("upload 调用");
  let filename = uuid.v1();//基于时间戳生成 一个唯一标识符
  let writeStream = fs.createWriteStream(path.join(__dirname, '../record/'+ filename));
  req.on("data", (data) => {
    writeStream.write(data);//写入流
  });
  req.on('end', (data) => {
    writeStream.end(data);//关闭   将客户端传来的数据写入文件
    handler.handleData(path.join(__dirname, '../record/'+ filename));
  });
  res.json({code:0});
});

module.exports = router;
