"use strict";

let listArray;
let dataList = [];
// 토큰 가져오기
const token = localStorage.getItem('token');

const projectBox1 = document.querySelector("#project-box-wrapper1");
const projectBox2 = document.querySelector("#project-box-wrapper2");
const projectBox3 = document.querySelector("#project-box-wrapper3");
const projectBox4 = document.querySelector("#project-box-wrapper4");
const projectBox5 = document.querySelector("#project-box-wrapper5");
const projectBox6 = document.querySelector("#project-box-wrapper6");

// 속성 값 가져오기
const searchInfo = document.querySelector("#searchInfo");
const regBtn = document.querySelector("#regBtn");
const resultInfo = document.querySelector("#result");
const addTodoList = document.querySelector("#addTodo");
const dateContent = document.querySelector(".time");
const sibebarAlert = document.querySelector(".app-sidebar");
const inputField = document.querySelector(".inputField");
const footer = document.querySelector(".footer");

let today = new Date();
let year = today.getFullYear(); 
let month = today.getMonth() + 1
let date = today.getDate(); // 일

$( document ).ready(function() {
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

  dateContent.innerHTML = year + "년 " +month + "월 " + date + "일";

  searchInfo.addEventListener("click", searchAllUser);
  regBtn.addEventListener("click", reg);
  sibebarAlert.addEventListener("click", sibebarFunction);
  projectBox1.addEventListener("click", detailSearch);

  // 사용자ID 가져오기
  const userId = localStorage.getItem('userId')
  document.getElementById("userId").innerHTML = userId;

  // 보드정보 조회
  //search();

  // 전체 유저 정보 조회
  searchAllUser();
});

function search() {
  const searchInfoData = document.querySelector("#search-info");

  let params = {
    "searchVal": searchInfoData.value,
  };

  if(params == null) {
    params.searchVal = "";
  }
  
  let query = Object.keys(params)
               .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
               .join('&');

  let url = 'http://127.0.0.1:3000/findContent?' + query;

  fetch(url, {
    method: "GET",
    headers: { 
      "auth" : token,
    }
  })
  .then((res) => res.json())
  .then((res) => {
      if(res.success) {
        let membersList = [];
        dataList.push(res.content);
        for(let i=0; i < dataList[0].length; i++) {
          membersList.push(dataList[0][i].MEMBERS_ID);
        }
        const dupArr = membersList;
        const set = new Set(dupArr);
        const uniqueArr = [...set];

      }else {
        swal(res.msg);
      };
  });
}

function searchAllUser() {  
  const searchInfoData = document.querySelector("#search-info");

  let params = {
    "searchVal": searchInfoData.value,
  };

  let query = Object.keys(params)
               .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
               .join('&');

  let url = 'http://127.0.0.1:3000/findUserInfo?' + query;

  fetch(url, {
    method: "GET",
  })
  .then((res) => res.json())
  .then((res) => {
    if(res.success) {
      let cnt = 0;
      let userInfo = res.userInfo;
      console.log(userInfo);

      $(".project-box-wrapper").each(function(index,obj){
        let $index = $(this);
        let indexLength = $(this).index();
        $index.css('visibility', 'hidden');

        if(indexLength < userInfo.length) {
          $index.css('visibility', 'visible');
          
          $index.find('span')[0].append(year + "년 " +month + "월 " + date + "일");
        }
      });
      $(".message-box").each(function(index,obj){
        let $index = $(this);
        let name = $(this).find();
        let indexLength = $(this).index();
        
        if(indexLength < userInfo.length) {
          $($index).find('p:eq(1)');

          $index.css('visibility', 'visible');
          //console.log($($index).find('p:eq(1)'));
        }
      });

      userInfo.forEach((item) => {
        if(item) {
          cnt += item.BOARD_CNT;
        }
      })

      document.querySelector('#inProgress').innerHTML = cnt;
      document.querySelector('#complete').innerHTML = cnt;
      document.querySelector('#totalProject').innerHTML = cnt;
    }else {
      swal(res.msg);
    }
    
  });
}

function reg() {
  let sendData = {};
  let dataList = [];
  $("#result li").each(function( idex, element) {
    dataList.push($(this).text());
  })

  sendData.userId = userId;
  sendData.userNm = '박대철';
  sendData.subject = '제목입니다.';
  sendData.content = dataList;
  
  const msg = {
    'succ' : "등록되었습니다."
    ,'fail' : "등록실패했습니다."
  }

  fetch("http://127.0.0.1:3000/addBoard", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sendData),
  })
    .then((res) => res.json()) 
    .then((res) => {
      if(res.success) {
        console.log(res);
        swal(msg.succ)
        .then(function(){
          offClick();                     
          location.href = "/main";
        });
      }else {
        //swal(msg.fail);
      };
    })
    .catch((err) => {
      console.error(new Error("게시판 등록 중 발생"));
    })
}

document.addEventListener('DOMContentLoaded', function () {
  var modeSwitch = document.querySelector('.mode-switch');

  modeSwitch.addEventListener('click', function() {  
    document.documentElement.classList.toggle('dark');
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

function sibebarFunction() {
  swal("개발진행중입니다. ckm... ing...");
}

function detailSearch() {
  addTodoList.style.display ='none';

  inputField.style.display = 'none';
  footer.style.display = 'none';

  var ul_list = $("#Read-Todo"); 
  for(let i=0, j=dataList[0].length; i < j; i++) {
    ul_list.append("<li>" + dataList[0][i].CONTENT + "</li>"); 
  }

  document.querySelector('.modal_wrap').style.display ='block';
  document.querySelector('.black_bg').style.display ='block';
}

// getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

// onkeyup event
inputBox.onkeyup = ()=>{
  let userEnteredValue = inputBox.value; //getting user entered value
  if(userEnteredValue.trim() != 0){ //if the user value isn't only spaces
    addBtn.classList.add("active"); //active the add button
  }else{
    addBtn.classList.remove("active"); //unactive the add button
  }
}

showTasks(); //calling showTask function

addBtn.onclick = ()=>{ //when user click on plus icon button
  let userEnteredValue = inputBox.value; //getting input field value
  let getLocalStorageData = localStorage.getItem("New Todo"); //getting localstorage
  if(getLocalStorageData == null){ //if localstorage has no data
    listArray = []; //create a blank array
  }else{
    listArray = JSON.parse(getLocalStorageData);  //transforming json string into a js object
  }
  listArray.push(userEnteredValue); //pushing or adding new value in array
  localStorage.setItem("New Todo", JSON.stringify(listArray)); //transforming js object into a json string
  showTasks(); //calling showTask function
  addBtn.classList.remove("active"); //unactive the add button once the task added
}

function showTasks(){
  let getLocalStorageData = localStorage.getItem("New Todo");
  if(getLocalStorageData == null){
    listArray = [];
  }else{
    listArray = JSON.parse(getLocalStorageData); 
  }
  const pendingTasksNumb = document.querySelector(".pendingTasks");
  pendingTasksNumb.textContent = listArray.length; //passing the array length in pendingtask
  if(listArray.length > 0){ //if array length is greater than 0
    deleteAllBtn.classList.add("active"); //active the delete button
  }else{
    deleteAllBtn.classList.remove("active"); //unactive the delete button
  }
  let newLiTag = "";
  listArray.forEach((element, index) => {
    newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
  inputBox.value = ""; //once task added leave the input field blank
}

// delete task function
function deleteTask(index){
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1); //delete or remove the li
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks(); //call the showTasks function
}

// delete all tasks function
deleteAllBtn.onclick = () => {
  listArray = []; //empty the array
  localStorage.setItem("New Todo", JSON.stringify(listArray)); //set the item in localstorage
  showTasks(); //call the showTasks function
}