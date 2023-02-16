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

const btn = document.getElementById('btn');         //버튼
let addValue = document.getElementById('addValue'); //할일 입력
let result = document.getElementById('result');    //추가된 할일

//할일 추가시
function addTodo(){
    if(addValue.value==false){     /*''도 가능 */
      alert('내용을 입력하세요!');
    }else{
      let list = document.createElement("li");
      let del = document.createElement('button');
      list.innerHTML = addValue.value;
      result.appendChild(list); //추가된 할일에 할일 리스트 추가하기
      list.appendChild(del);    //할일 리스트 추가시 삭제버튼도 추가    
      del.innerText = "x";      //삭제버튼에 들어갈 'x'자 문자
      del.style.fontSize = "20px";
      del.style.border = "none";
      del.style.float = "right";
      del.style.right = "17px";
      del.style.marginTop = "10px";
      del.style.cursor = "pointer";
      del.addEventListener("click", deleteList); //삭제버튼 클릭시 리스트지우기 이벤트 실행
      del.style.position='relative';
    }
}

//할일 목록 삭제시
function deleteList(e){ //삭제 버튼(x) 클릭시 
    let removeOne = e.target.parentElement;  //선택한 목록 한개만 지우기(부모 객체를 지운다)
    removeOne.remove();
}

function addTodo(){

  if(addValue.value==false){     /*''도 가능 */
    swal('내용을 입력하세요!');
  }else{
    let list = document.createElement("li");
    let del = document.createElement('button');
    list.innerHTML = addValue.value;
    result.appendChild(list); //추가된 할일에 할일 리스트 추가하기
    list.appendChild(del);    //할일 리스트 추가시 삭제버튼도 추가    
    del.innerText = "x";      //삭제버튼에 들어갈 'x'자 문자
    del.style.fontSize = "20px";
    del.style.border = "none";
    del.style.float = "right";
    del.style.right = "17px";
    del.style.marginTop = "10px";
    del.style.cursor = "pointer";
    del.addEventListener("click", deleteList); //삭제버튼 클릭시 리스트지우기 이벤트 실행
    del.style.position='relative';
  }
}

function allClearList(e){
  if(confirm("정말 삭제하시겠습니까?")==true){   //취소메시지가 true(ok)일때
      if(result.innerText==''){                      //목록칸이 비어있다면
          alert("삭제할 목록이 없습니다");              //삭제할 목록이 없다는 경고창뜨기
      }else{                                         //삭제할 목록이 있다면
          result.innerText='';                       //전체 삭제
      }
  }else{                                      //취소메시지가 false(no)일때
      return false;                           //삭제 취소
  }
}