
//References
const node_container = document.querySelector(".node-container");
const slider = document.querySelector("#howManyColumns");
const speed_slider = document.querySelector("#speed");
const refresh_array = document.querySelector("#refresh-array");
const bubble_sort = document.querySelector("#bubble-sort");
const stop_button = document.querySelector("#stop");

//Variables
var numOfColumns = 50;
var array = new Array(numOfColumns); //Base array
var slider_value = 50;
slider.value = slider_value; //slider value of number of columns
var speed = 10; //speed of sorting
var shouldStop = true; //determines if sorting should be stopped

//Change number of columns on slider input
slider.oninput = function() {
    slider_value = this.value;
    
    //Reset existing array
    resetArray(array);

    //Update the number of columns
    updateColumnNums(slider_value);

    //Create a random array again
    createArray();

    //Clear all columns
    node_container.innerHTML = "";

    //Create new columns
    createColumns();
}

//Change speed on slider input
speed_slider.oninput = function() {
    speed = this.value;
}

//Disable buttons and sliders
function setDisabled(){
    slider.disabled = true;
    slider.style.backgroundColor = "red";

    speed_slider.disabled = true;
    speed_slider.style.backgroundColor = "red";

    refresh_array.disabled = true;
    refresh_array.style.backgroundColor = "red";
}

//Enable buttons and sliders
function setEnabled(){
    slider.disabled = false;
    slider.style.backgroundColor = "white";

    speed_slider.disabled = false;
    speed_slider.style.backgroundColor = "white";

    refresh_array.disabled = false;
    refresh_array.style.backgroundColor = "#f50";
}

//Create on load
document.addEventListener("DOMContentLoaded", () => {
    createArray();
    createColumns();
})

//Stop button
stop_button.addEventListener("click", () => {
    setEnabled();
    isFinished = true;
    shouldStop = true;
})

//Refresh button
refresh_array.addEventListener("click", () => {
    node_container.innerHTML = "";
    createArray();
    createColumns();
})

//Bubble sort button
bubble_sort.addEventListener("click", () => {
    setDisabled();
    BubbleSort(array);
})

//Update number of columns
function updateColumnNums(val){
    numOfColumns = val;
}

//Reset array values
function resetArray(arr){
    arr.length = 0;
}

//Create a random array
function createArray(){
    for(let i = 0; i < numOfColumns; i++){
        array[i] = randomNum(5, node_container.offsetHeight);
    }
}

//Create columns based on array length
function createColumns(){
    node_container.innerHTML = "";
    for(let i = 0; i < array.length; i++){
        let column = document.createElement('div');
        column.classList.add("node");
        column.style.height = array[i] - node_container.style.height + "px";
        node_container.appendChild(column);
    }
}

//Sleep function
function sleep(ms){
    return new Promise((resolve) => setTimeout(resolve,ms));
}

//Bubble Sort
async function BubbleSort(arr){
    shouldStop = false;
    let columns = document.getElementsByClassName("node");
    for(let i = 0; i < arr.length - 1; i++){
        for(let j = 0; j < arr.length - i - 1; j++){
            if(arr[j] > arr[j+1]){

                //Set colors
                columns[j].style.backgroundColor = "red";
                columns[j+1].style.backgroundColor = "red";
                
                await sleep(speed);

                let temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;

                //Change heights
                columns[j].style.height = arr[j] + "px";
                columns[j+1].style.height = arr[j+1] + "px";

                //Set colors again
                columns[j].style.backgroundColor = "white";
                columns[j+1].style.backgroundColor = "white";

            }
            if(shouldStop)
                return;
        }
    }

    //Green wave
    for(let k = 0; k<arr.length; k++){

        await sleep(1/arr.length/arr.length);
        //Set colors
        columns[k].style.backgroundColor = "lightgreen";
        
    }
    setEnabled();
    shouldStop = true;
}

//Generate random value between min and max
function randomNum(min, max){
    return Math.floor(Math.random() * (max-min+1)) + min;
}