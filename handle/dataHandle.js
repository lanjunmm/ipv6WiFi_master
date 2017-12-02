const fs = require('fs');
const Wifi = require('../models/wifi');
const Record = require('../models/record');
const async = require('async');
const path = require('path');

function saveData(item, callback) {//对每一个坐标处的wifiList+gps处理
  let dataList = item.wifiList; //wifiList中是多个wifi（ssid,level,frequency）
  let i = 0;
  async.whilst(
    function () {
      return i < dataList.length;
    },
    function (cb) {
      _save(dataList[i], () => {
        ++i;
        cb();
      });
    },
    function (err) {
      console.log('All work is done');
      callback();
    }
  );
  function _save(data, callback) {
      let record = data;//data:{ SSID: 'eduroam', level: -86, frequency: 2437 }
      // console.log("wifiList的数据",data);
      record.time = new Date(item.time);
      record.macAdr = item.macAdr;
      record.longitude = item.gps.longitude;
      record.latitude = item.gps.latitude;
      const recordObj = new Record(record);//record:SSID,level,frequency,time,macAdr,longitude,latitude
      // console.log("frequency的类型：",typeof data.frequency);
      recordObj.save((err) => {  //插入数据库
        if (err) {
          console.log(err);
        }
      });
      // console.log("wifiList的数据",data);  两个地方输出的data数据不一样，why
      Wifi.getBySSID(data.SSID, (err, result) => {
        if (err) {
          return console.log(err);
        }
        if (result.length <= 0 ) {//如果wifi表中没有则插入wifi表中
          let wifi = {SSID: data.SSID};
          let wifiObj = new Wifi(wifi);
          wifiObj.save((err) => {
            if (err) {
              console.log(err);
            }
            callback();
          });
        } else {
          callback();
        }
      });
  }

}

function handleData(filename, callback) {
    console.log("hanleData 调用");
  fs.readFile(filename, 'utf8' ,(err, data) => {//异步读取,读取文件中的全部内容
    let result = data.split('/n');//每一个/n隔开一个wifilist+gps，表示某一个坐标的wifi信息
    result = result.slice(0, result.length - 1);//slice 返回一个新的数组，包含从 start 到 end （不包括该元素）的 result 中的元素。
    let i = 0;
    async.whilst( //用于循环的流程控制
      function () {
        return i  < result.length;
      }, //循环条件
      function (cb) {
        saveData(JSON.parse(result[i]), () => {
          ++i;
          cb(); //这个位置的意思就是如果到达了条件才再次调用循环
        });
      },//循环体
      function (err) {
        console.log('All work is done');
        if (callback)
        callback();
      }//出错或者err时进入
    );
  });
}
// handleData(path.join(__dirname, '../record/'+ '82787c50-03ce-11e7-877d-1f1529a67a86'));//这里就是输出好长一串东西的那里
module.exports = {
  handleData,
};
