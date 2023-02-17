"use strict";

const userId = localStorage.getItem('userId')
const token = localStorage.getItem('token');
let listArray;

document.getElementById("userId").innerHTML = userId;

const searchInfo = document.querySelector("#searchInfo");
const searchInfoData = document.querySelector("#search-info");
const regBtn = document.querySelector("#regBtn");
const resultInfo = document.querySelector("#result");
const sibebarAlert = document.querySelector(".app-sidebar");
const inputField = document.querySelector(".inputField");
const footer = document.querySelector(".footer");

searchInfo.addEventListener("click", search);
regBtn.addEventListener("click", reg);
sibebarAlert.addEventListener("click", sibebarFunction);

let dataList = [];

const projectBox1 = document.querySelector("#project-box-wrapper1");
const projectBox2 = document.querySelector("#project-box-wrapper2");
const projectBox3 = document.querySelector("#project-box-wrapper3");
const projectBox4 = document.querySelector("#project-box-wrapper4");
const projectBox5 = document.querySelector("#project-box-wrapper5");
const projectBox6 = document.querySelector("#project-box-wrapper6");

const addTodoList = document.querySelector("#addTodo");

projectBox1.addEventListener("click", detailSearch);

const dateContent = document.querySelector(".time");

let today = new Date();
let year = today.getFullYear(); 
let month = today.getMonth() + 1
let date = today.getDate(); // 일

dateContent.innerHTML = year + "년 " +month + "월 " + date + "일";

$( document ).ready(function() {
  search();
});



function search() {
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
        dataList.push(res.content);
        
        for(let i=0; i < dataList[0].length; i++) {
          projectBox2.style.visibility ='hidden';
          projectBox3.style.visibility ='hidden';
          projectBox4.style.visibility ='hidden';
          projectBox5.style.visibility ='hidden';
          projectBox6.style.visibility ='hidden';
        }
        

      }else {
        swal(res.msg);
      };
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
deleteAllBtn.onclick = ()=>{
  listArray = []; //empty the array
  localStorage.setItem("New Todo", JSON.stringify(listArray)); //set the item in localstorage
  showTasks(); //call the showTasks function
}