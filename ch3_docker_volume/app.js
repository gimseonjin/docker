const express = require('express');
const mysql = require('mysql2');

const app = express();

const connection = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: 'example',
  database: 'mydatabase'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('MySQL 데이터베이스에 연결되었습니다!');
});

app.get('/', (req, res) => {
  connection.query('SELECT * FROM my_table', (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.listen(3000, () => {
  console.log('앱이 포트 3000에서 실행되었습니다!');
});