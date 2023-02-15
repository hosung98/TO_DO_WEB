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

window.onload = function() {
 
  function onClick() {
      document.querySelector('.modal_wrap').style.display ='block';
      document.querySelector('.black_bg').style.display ='block';
  }   
  function offClick() {
      document.querySelector('.modal_wrap').style.display ='none';
      document.querySelector('.black_bg').style.display ='none';
  }

  document.getElementById('modal_btn').addEventListener('click', onClick);
  document.querySelector('.modal_close').addEventListener('click', offClick);

};



document.addEventListener('DOMContentLoaded', function () {
  var modeSwitch = document.querySelector('.mode-switch');

  modeSwitch.addEventListener('click', function () {                     document.documentElement.classList.toggle('dark');
    modeSwitch.classList.toggle('active');
  });
  
  var listView = document.querySelector('.list-view');
  var gridView = document.querySelector('.grid-view');
  var projectsList = document.querySelector('.project-boxes');

  listView.addEventListener('click', function () {
    gridView.classList.remove('active');
    listView.classList.add('active');
    projectsList.classList.remove('jsGridView');
    projectsList.classList.add('jsListView');
  });
  
  gridView.addEventListener('click', function () {
    gridView.classList.add('active');
    listView.classList.remove('active');
    projectsList.classList.remove('jsListView');
    projectsList.classList.add('jsGridView');
  });
  
  document.querySelector('.messages-btn').addEventListener('click', function () {
    document.querySelector('.messages-section').classList.add('show');
  });
  
  document.querySelector('.messages-close').addEventListener('click', function() {
    document.querySelector('.messages-section').classList.remove('show');
  });
});

