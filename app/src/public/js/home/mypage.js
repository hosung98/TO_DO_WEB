"use strict";

window.onload = function() {
  document.getElementById('checkModal').style.display = 'none';
  document.getElementById('changeModal').style.display = 'none';

  const id = localStorage.getItem('userId');
  let req = {
    id : id
  }

  let query = Object.keys(req)
             .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(req[k]))
             .join('&');

  let url = 'http://localhost:3000/mypage?' + query;
  
  fetch(url, {
    method : "GET"
  })
    .then((res) => res.json())
    .then((res) => {
      const id = res[0].id;
      const name = res[0].name;
      
      document.getElementById('userId').innerHTML = id;
      document.getElementById('id').innerHTML = id;
      document.getElementById('name').innerHTML = name;
    
    })
    .catch((err) => {
      console.error(new Error("마이페이지 오류 발생"));
    })
};

function checkInfo() {
  document.getElementById('checkModal').style.display = 'block';
}

function check() {
  let pwd = document.getElementById('password').value;

  let req = {
    id : localStorage.getItem('userId'),
    password : pwd
  }

  let query = Object.keys(req)
             .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(req[k]))
             .join('&');

  let url = 'http://localhost:3000/check?' + query;
  
  fetch(url, {
    method : "GET"
  })
    .then((res) => res.json())
    .then((res) => {
      if(res[0].CNT > 0){

      }else{
        alert("정보가 일치하지 않습니다.");
        closeCheck();
      }
    })
    .catch((err) => {
      console.error(new Error("회원정보확인 오류 발생"));
    })  
}

function closeCheck() {
  document.getElementById('checkModal').style.display = 'none';
}
