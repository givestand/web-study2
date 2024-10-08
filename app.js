const express = require('express');
const helmet = require('helmet');
const app = express();
const ejs = require("ejs")
const db = require('./model/db')
const json2xls = require('json2xls');

app.set('view engine', 'ejs');
app.set('views', './views')
app.use('/public',express.static(__dirname + '/public'));

//미들웨어 요청과 응답 사이에 동작하는 함수
// app.use(helmet());-
app.use(express.json());
app.use(express.urlencoded());
app.use(json2xls.middleware);

const mainRouter = require('./router/mainRouter')
app.use('/',mainRouter)

app.listen(3000,function(req,res){

    db.sequelize.sync({force:false})
    console.log("서버가 실행되었습니다.")
})