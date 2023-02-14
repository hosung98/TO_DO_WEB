"use strict";

// 선택자를 통해 html 값을 가져올 수 있음
const id = document.querySelector("#id"), //# = 태그의 id (ex) <input id= >
  password = document.querySelector("#password"),
  loginBtn = document.querySelector("#loginButton");
  
// 클릭이벤트
loginBtn.addEventListener("click", login);

function login() {
  let params = {
    id: id.value,
    password: password.value,
  };
  
  if(!params.id) {
    alert("아이디를 입력하세요.");
    return;
  }
  if(!params.password) {
    alert("비밀번호를 입력하세요.");
    return;
  }
  
  let query = Object.keys(params)
              .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
              .join('&');
  let url = 'http://127.0.0.1:3000/?' + query;

  console.log(url);
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  })
    .then((res) => res.json()) // json으로 읽는다.
    .then((res) => {
      if(res.success) {
        location.href = "/main";
      }else {
        alert(res.msg);
      };
    })
    .catch((err) => {
      console.error(new Error("로그인 중 발생"));
    })

  // fetch(url)
  //   .then(data => data.text())
  //   .then((text) => {
  //     console.log('request succeeded with JSON response', text);
  //     if(text.length === 2) {
  //       alert("아이디와 비밀번호가 일치하지 않습니다.");
  //     }else {
  //       alert("로그인 성공입니다.");
  //       location.href = "/main";
  //     };
  //   }).catch(function (error) {
  //     console.log('request failed', error)
  //   });

}