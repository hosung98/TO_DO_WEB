function fn_login(){
    alert("로그인 실행");

   /* const express = require("express");
    const app = express();
    debugger;
    const url = "http://127.0.0.1:3000";
    fetch(url, {
        method: "GET"
    }).then(response => {
        return response.text();
    }).then(text => {
        const data = JSON.parse(text);
        console.log(data);
    }).catch(error => {
        console.warn(error);
    });*/
    debugger;
    const request = require('request');

    // Get 요청하기 http://www.google.com
    const options = {
        uri: "http://127.0.0.1:3000"
    };
    
    request.get(options, function (error, response, body) {
        console.log("respones : " + response);
    });    
}