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

function Wifi(wifi) {
  if(!(this instanceof Wifi)) {
    return new Wifi(wifi);
  }
  filter.dataInitial(Wifi.props, this, wifi);
}

Wifi.props = {
  SSID: {
    type: String,
    required: true
  }
};


Wifi.prototype.save = function (callback) {
  // console.log("wifi表调用");
  db.query('INSERT wifi SET ?', [this], function (err) {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback();
    }
  });
};

Wifi.getBySSID = function (SSID, callback) {
  db.query('SELECT * FROM wifi WHERE SSID=?', [SSID], (err, results) => {
    // console.log(results);
    callback(err, results);
  });
}

Wifi.getList = function (SSID, callback) {
  db.query('SELECT SSID FROM wifi', callback);
}
module.exports = Wifi;
