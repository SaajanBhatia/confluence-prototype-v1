document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded");
});

function clearKanbanBoard(){
  document.getElementById("backlog").innerHTML = ''
  document.getElementById("inProgress").innerHTML = ''
  document.getElementById("review").innerHTML = ''
  document.getElementById("completed").innerHTML = ''
}


//store json objects
let kanbanInfo = [];

//Kanban load tasks
function createKanban(kanbanData) {
  console.log('kanban data')
  console.log(kanbanData)
  clearKanbanBoard();
  for (let i = 0; i < kanbanData.length; i++) {
    // const refreshBacklog = () => document.getElementById(backlog).empty();
    // refreshBacklog();
    if (kanbanData[i].cardState == "todo") {
      var currentList = document.getElementById("backlog").innerHTML;
      var updatedList =
        currentList +
        `<div class="relative group bg-white ml-1 mr-1.5 border-gray-200 shadow-md opacity-80 border-2 px-2 py-1 mx-0 my-1" id="${kanbanData[i].cardTitle}">
        <div class="absolute group group-hover:opacity-100 opacity-0 z-100 top-0 bottom-0 left-0  bg-black/50 w-full h-full">
        <button class="" onclick="moveRight('${kanbanData[i].cardId}')"><i class="fa fa-arrow-right"></i></button> </div>
        <h4>${kanbanData[i].cardTitle}</h4>
      <h6>${kanbanData[i].description}</h6>
      <p>${kanbanData[i].dateMade}</p>
    </div>`;
      document.getElementById("backlog").innerHTML = updatedList;
    }

    if (kanbanData[i].cardState == "inProgress") {
      var currentList = document.getElementById("inProgress").innerHTML;
      var updatedList =
        currentList +
        `<div class="relative group bg-white ml-1 mr-1.5 border-gray-200 shadow-md opacity-80 border-2 px-2 py-1 mx-0 my-1" id="${kanbanData[i].cardTitle}">
        <div class="absolute group group-hover:opacity-100 opacity-0 z-100 top-0 bottom-0 left-0  bg-black/50 w-full h-full">
        <button class="" onclick="moveLeft('${kanbanData[i].cardId}')"><i class="fa fa-arrow-left"></i></button> 
        <button class="" onclick="moveRight('${kanbanData[i].cardId}')"><i class="fa fa-arrow-right"></i><button>
        </div>
        <h4>${kanbanData[i].cardTitle}</h4>
      <h6>${kanbanData[i].description}</h6>
      <p>${kanbanData[i].dateMade}</p>
    </div>`;
      document.getElementById("inProgress").innerHTML = updatedList;
    }

    if (kanbanData[i].cardState == "review") {
      var currentList = document.getElementById("review").innerHTML;
      var updatedList =
        currentList +
        `<div class="relative group bg-white ml-1 mr-1.5 border-gray-200 shadow-md opacity-80 border-2 px-2 py-1 mx-0 my-1" id="${kanbanData[i].cardTitle}">
      <div class="absolute group group-hover:opacity-100 opacity-0 z-100 top-0 bottom-0 left-0  bg-black/50 w-full h-full">
      <button class="" onclick="moveLeft('${kanbanData[i].cardId}')"><i class="fa fa-arrow-left"></i></button> 
      <button class="" onclick="moveRight('${kanbanData[i].cardId}')"><i class="fa fa-arrow-right"></i><button>
      </div>
        <h4>${kanbanData[i].cardTitle}</h4>
      <h6>${kanbanData[i].description}</h6>
      <p>${kanbanData[i].dateMade}</p>
    </div>`;
      document.getElementById("review").innerHTML = updatedList;
    }

    if (kanbanData[i].cardState == "completed") {
      var currentList = document.getElementById("completed").innerHTML;
      console.log(currentList);
      var updatedList =
        currentList +
        `<div class="relative group bg-white ml-1 mr-1.5 border-gray-200 shadow-md opacity-80 border-2 px-2 py-1 mx-0 my-1" id="${kanbanData[i].cardTitle}">
      <div class="absolute group group-hover:opacity-100 opacity-0 z-100 top-0 bottom-0 left-0  bg-black/50 w-full h-full">
      <button class="" onclick="moveLeft('${kanbanData[i].cardId}')"><i class="fa fa-arrow-left"></i></button> </div>
        <h4>${kanbanData[i].cardTitle}</h4>
      <h6>${kanbanData[i].description}</h6>
      <p>${kanbanData[i].dateMade}</p>
      
    </div>`;
      document.getElementById("completed").innerHTML = updatedList;
      console.log(updatedList);
    }
  }
  console.log(kanbanInfo)
}

// PRODUCTION ISHA
// function makeDBRequest(req){
//   // Call DB
//   return true
// }

// // call this function in the html code above
// function moveLeftData(cardId){
//   if (makeDBRequest('sql query to update data')){
//     moveLeft(cardId)
//   } else {
//     alert('db conn problem')
//   }
// }

//kanban function to move cards between columns
function moveLeft(cardId) {
  console.log("parameter: " + cardId);
  //change the state and update the object
  for (let i = 0; i < kanbanInfo.length; i++) {
    if (kanbanInfo[i].cardId === cardId) {
      if (kanbanInfo[i].cardState === "completed") {
        kanbanInfo[i].cardState = "review";
      } else if (kanbanInfo[i].cardState === "review") {
        kanbanInfo[i].cardState = "inProgress";
      } else if (kanbanInfo[i].cardState === "inProgress") {
        kanbanInfo[i].cardState = "todo";
      }
    }
  }
  createKanban(kanbanInfo);
}

// = changing value
// == Comparing True/ false
// === Comparing anything else

function moveRight(cardId) {
  console.log("parameter: " + cardId);
  //change the state and update the object
  for (let i = 0; i < kanbanInfo.length; i++) {
    if ((kanbanInfo[i].cardId === cardId)) {
      if (kanbanInfo[i].cardState === "todo") {
        kanbanInfo[i].cardState = "inProgress";
      } else if (kanbanInfo[i].cardState === "inProgress") {
        kanbanInfo[i].cardState = "review";
      } else if (kanbanInfo[i].cardState === "review") {
        kanbanInfo[i].cardState = "completed";
      }
    }
  }
  createKanban(kanbanInfo);
}

var isInitiated = false;

//grab content from json file
function initiateBoard() {
  fetch("tasks.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (kanbanData) {
      kanbanInfo = kanbanData;
      createKanban(kanbanInfo);
    });
}

if (!isInitiated) {
  initiateBoard();
  isInitiated = true;
  console.log("has been initiated");
}