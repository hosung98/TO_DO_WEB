"use strict";

window.onload = function() {

  const id = localStorage.getItem('userId');
  let req = {
    id : id
  }

  let query = Object.keys(req)
             .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(req[k]))
             .join('&');

  let url = 'http://127.0.0.1:3000/mypage?' + query;
  
  fetch(url, {
    method : "GET"
  })
    .then((res) => res.json())
    .then((res) => {
      const id = res[0].id;
      const name = res[0].name;
      
      document.getElementById('id').innerHTML = id;
      document.getElementById('name').innerHTML = name;
    
    })
    .catch((err) => {
      console.error(new Error("마이페이지 오류 발생"));
    })
};
