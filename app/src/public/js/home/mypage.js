"use strict";

const userId = localStorage.getItem('userId')
document.getElementById("userId").innerHTML = userId;

const searchInfo = document.querySelector("#searchInfo");
searchInfo.addEventListener("click", search);

function search() {
  const req = searchInfo.value;

  fetch("http://127.0.0.1:3000/main", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json()) 
    .then((res) => {
      if(res.success) {
        alert("조회성공.");
        //document.getElementById("project-box-wrapper1").style.display = 'none';
      }else {
        alert("조회실패");
      };
    })
    .catch((err) => {
      console.error(new Error("로그인 중 발생"));
    })
};