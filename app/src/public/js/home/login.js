"use strict";

const id = document.querySelector("#id"), 
  password = document.querySelector("#password"),
  loginBtn = document.querySelector("#loginButton");

loginBtn.addEventListener("click", login);

function login() {
  const req = {
    id: id.value,
    password: password.value,
  };
  
  fetch("http://127.0.0.1:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json()) 
    .then((res) => {
      if(res.success) {
        alert("로그인에 성공하여 메인화면으로 이동합니다.");
        location.href = "/main";
      }else {
        alert(res.msg);
      };
    })
    .catch((err) => {
      console.error(new Error("로그인 중 발생"));
    })
}


