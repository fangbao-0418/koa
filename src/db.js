import mysql from 'mysql'
var connection = mysql.createConnection({
  host     : '120.24.214.233',
  user     : 'fangbao',
  password : 'fb041827',
  database : 'me',
  port     : '3306'
});
connection.connect();
export default connection