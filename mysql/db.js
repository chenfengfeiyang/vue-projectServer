var mysql = require('mysql');

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'myweb'
});
connection.connect(() => {
    console.log('数据库连接成功');
})

module.exports = connection;