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

  let url = serverUrl+'/mypage?' + query;
  
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

  let url = serverUrl+'/check?' + query;
  
  fetch(url, {
    method : "GET"
  })
  .then((res) => res.json())
  .then((res) => {
    if(res[0].CNT > 0){
      alert("본인 확인이 되었습니다.");
      document.getElementById('checkModal').style.display = 'none';
      document.getElementById('changeModal').style.display = 'block';
    }else{
      alert("정보가 일치하지 않습니다.");
      closeCheck();
    }
  })
  .catch((err) => {
    console.error(new Error("회원정보확인 오류 발생"));
  })  
}

function changeInfo() {
  let name = document.getElementById('changeName').value;

  let req = {
    id : localStorage.getItem('userId'),
    name : name
  }
  
  fetch(serverUrl + '/mypage', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
  .then((res) => res.json())
  .then((res) => {
    if(res.msg == "SUCESS"){
      alert("정보가 변경되었습니다.");
      closeChange();
      location.href="/mypage";
    }else{
      alert("정보가 변경되지않았습니다.");
    }
  })
  .catch((err) => {
    console.error(new Error("개인정보 수정 중 오류발생"));
  })    
  
}

function closeCheck() {
  document.getElementById('checkModal').style.display = 'none';
}

function closeChange() {
  document.getElementById('changeModal').style.display = 'none'; 
}