/**
 * *****************************************************************************
 *
 *
 * @file admin.js
 *
 * @author Chris Gao
 *
 * @description
 *
 * @version 1.0
 * 
 * *****************************************************************************
 */
const db = require('./db');
const filter = require('../handle/filter');

function Record(record) {//record:SSID,level,frequency,time,macAdr,longitude,latitude
  if(!(this instanceof Record)) {
    return new Record(record);
  }
  filter.dataInitial(Record.props, this, record);
}

Record.props = {
  SSID: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  macAdr: {
    type: String,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    require: true,
  },
  time: Object,
  frequency: {
        type:Number,
        require:true,
    }
};

Record.prototype.save = function (callback) {
  db.query('INSERT record SET ?', [this], function (err) {//[this]:SSID,level,macAdr,longitude,latitude,frequency,time
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback();
    }
  });
};

Record.getListBySSID = function (callback) {  //SSID,callback
  // db.query('SELECT level, longitude, latitude FROM record WHERE SSID=?', [SSID], callback);
    db.query('SELECT * FROM record WHERE frequency!=""',callback);
};

Record.getALL = function (callback) {  //
    db.query('SELECT * FROM wifi_gps.record ', callback);
};

// Record.getAllSSID = function (callback) {
//     db.query('SELECT distinct SSID  FROM wifi_gps.record ',callback);
// }//0.0

module.exports = Record;
