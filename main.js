let input = document.querySelector(".input");
let submit = document.querySelector(".add"); 
let tasksDiv = document.querySelector(".tasks");
// Empty Array To Store The Tasks
let arrayOfTasks = [];

// Check if Theres Tasks In Local Storage
if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks" ));
}
//  Tragger Get Data From Local Storage Function 
getDataFromLocalStorage()

//  Add Task
submit.onclick = function () {
    if (input.value !== "") {
        addTaskToArray(input.value); // Add Task To Array Of Task
        input.value = ""; //Empty Input Field 
    }
};

// Click On Task Element 
tasksDiv.addEventListener("click", (e) => {
    // Delete Button 
    if (e.target.classList.contains("del")) {
        // Remove Task From Local Storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id")); 
        //  remove Element From Page 
        e.target.parentElement.remove();
    }


    // Task Element 
    if (e.target.classList.contains("task")) {
        //  toggle Completed For The Task
        toggleStatusTaskWith(e.target.getAttribute("data-id"))
        // Toggle Done Class 
        e.target.classList.toggle("done");
    }
});

function addTaskToArray(taskText) {
    //  Task Data 
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };
    //  Push Task To Array Of Tasks
    arrayOfTasks.push(task); 
    // Add Tasks To Page 
    addElementsToPageFrom(arrayOfTasks);
    //  Add Tasks To Local storage
    addDataToLocalStorageFrom(arrayOfTasks);

}

function addElementsToPageFrom(arrayOfTasks){
    // Empty Tasks Div 
    tasksDiv.innerHTML = "";
    // Looping On Array OF Tasks
    arrayOfTasks.forEach((task) => {
        // create Main Div
        let div = document.createElement("div")
        div.className = "task";
        //  Check if task is Done 
        if (task.completed) {
            div.className = "task done";
        }
        div.setAttribute("data-id", task.id);
        let h1 = document.createElement("h1")
        h1.textContent = task.title;
        div.appendChild(h1);
        // Create Delete Button
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        //  Create edit Button
        let spanV = document.createElement("span");
        spanV.className = "edi";
        spanV.appendChild(document.createTextNode("edit"));
 
        //  Appened Button To Main Div 
        div.appendChild(spanV);
        div.appendChild(span);