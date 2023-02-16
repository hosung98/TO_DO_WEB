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
  
  // 유효성 체크
  if(!validation(req)) {
    return false;
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
        swal("로그인에 성공하여 메인화면으로 이동합니다.")
        .then(function(){
          localStorage.setItem("userId",req.id);  
          localStorage.setItem("token",res.token);                       
          location.href = "/main";
        });
        
      }else {
        swal(res.msg);
      };
    })
    .catch((err) => {
      console.error(new Error("로그인 중 발생"));
    })
}

const validation = (req) => {
  if(!req.id) {
    alert("아이디를 입력하세요.");
    return false;
  }
  if(!req.password) {
    alert("비밀번호를 입력하세요.");
    return false;
  }
  return true;
};
