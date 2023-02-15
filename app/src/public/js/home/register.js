"use strict";

const signButton = document.querySelector("#signButton")
    , id = document.querySelector("#id")
    , psword = document.querySelector("#psword")
    , named = document.querySelector("#name")
    , confirmPsword = document.querySelector("#confirm-psword");

signButton.addEventListener("click", sign);

function sign() {
  const req = {
    id: id.value,
    name: named.value,
    psword: psword.value,
    confirmPsword: confirmPsword.value,
  };
  
  // 유효성 체크
  if(!validation(req)) {
    return false;
  };

  console.log("성공");
  fetch("http://127.0.0.1:3000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json()) 
    .then((res) => {
      if(res.success) {
        alert("회원가입에 성공하여 로그인화면으로 이동합니다.");
        location.href = "/";
      }else {
        alert(res.msg);
      };
    })
    .catch((err) => {
      console.error(new Error("회원가입 중 발생"));
    })
}

const validation = (req) => {
  console.log(req);
  if(!req.id) {
    alert("아이디를 입력하세요.");
    return false;
  }
  if(!req.name) {
    alert("이름을 입력하세요.");
    return false;
  }
  if(!req.psword) {
    alert("비밀번호를 입력하세요.");
    return false;
  }
  if(req.psword !== req.confirmPsword) {
    alert("비밀번호와 비밀번호확인이 서로 일치하지 않습니다.");
    return false;
  }
  return true;
};
