var mysql = require('mysql');


var pool = mysql.createPool({
  connectionLimit: 50,
  host : '127.0.0.1',
  user : 'root',
  password : 'root',
  database : 'wifi_gps'
});


module.exports = pool;
