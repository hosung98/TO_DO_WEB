"use strict";

var bodyParser = require('body-parser')

// 모듈
const express = require('express');
const app = express();
  
// 라우팅
const home = require("./src/routes/home");

// 앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(bodyParser.json());
// URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", home); // use -> 미들 웨어를 등록해주는 메서드.
app.use(express.static(`${__dirname}/src/public`)); // app.js 가 있는 디렉토리 위치 : ${__dirname

//URL 직접 입력 막기
app.use((req, res, next) => {
    if (req.method === 'GET' && req.headers.accept && req.headers.accept.indexOf('html') !== -1) {
      // 요청이 GET이면서 Accept 헤더에 'html'이 포함되어 있을 경우에만 처리
      res.redirect('/'); // 홈페이지로 리다이렉트
    } else {
      next(); // 그 외의 경우에는 다음 미들웨어로 넘김
    }
  });

const path = require('path');
app.use('/node_modules', express.static(path.join(__dirname, '/node_modules')));

module.exports = app; 