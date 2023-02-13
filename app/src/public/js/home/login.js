"use strict";

// 선택자를 통해 html 값을 가져올 수 있음
const id = document.querySelector("#id"), //# = 태그의 id (ex) <input id= >
  password = document.querySelector("#password"),
  loginBtn = document.querySelector("#loginButton");

console.log(id, password, loginBtn, "hello");

// 클릭이벤트
loginBtn.addEventListener("click", login);

function login() {

  let params = {
    id: id.value,
    pw: password.value,
  };

  let query = Object.keys(params)
              .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
              .join('&');

  let url = 'http://127.0.0.1:3000/?' + query;

  fetch(url)
    .then(data => data.text())
    .then((text) => {
      console.log('request succeeded with JSON response', text);
      // text data가 null일 경우
      if(text.length === 2) {
        console.log(text.length + 'fail');
        alert("아이디와 비밀번호가 일치하지 않습니다.");
      }else {
        alert("로그인 성공입니다.");
        location.href = "/main";
        console.log(text.length + 'succ');
      };

    }).catch(function (error) {
      console.log('request failed', error)
    });


  //fetch();
}