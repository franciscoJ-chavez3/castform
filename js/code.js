//create empty array to push weather into
let data = [];
//create an empty array to push forecast into
let castdata = [];


//grab necessary weather elements
let cityInput = document.getElementById('cityInput');
let divtainer = document.getElementById('divtainer');

//grab necessary forecast elements
let card1Img = document.getElementById('card1Img');
let card1Day = document.getElementById('card1Day');
let card1Desc = document.getElementById('card1Desc');
let card1Temp = document.getElementById('card1Temp');

let card2Img = document.getElementById('card2Img');
let card2Day = document.getElementById('card2Day');
let card2Desc = document.getElementById('card2Desc');
let card2Temp = document.getElementById('card2Temp');

let card3Img = document.getElementById('card3Img');
let card3Day = document.getElementById('card3Day');
let card3Desc = document.getElementById('card3Desc');
let card3Temp = document.getElementById('card3Temp');

let card4Img = document.getElementById('card4Img');
let card4Day = document.getElementById('card4Day');
let card4Desc = document.getElementById('card4Desc');
let card4Temp = document.getElementById('card4Temp');

let card5Img = document.getElementById('card5Img');
let card5Day = document.getElementById('card5Day');
let card5Desc = document.getElementById('card5Desc');
let card5Temp = document.getElementById('card5Temp');

let cityHeader = document.getElementById('cityHeader');
let prevBtn = document.getElementById('prevBtn');
let nextBtn = document.getElementById('nextBtn');

let dropdownMenuBtn = document.getElementById('dropdownMenuButton');
let weatherDropDown = document.getElementById('weatherDropDown');
let forecastDropDown = document.getElementById('forecastDropDown');

//create counter for current weather
wIndex = 0;

//api variables for weather
let url_pt1 = "https://api.openweathermap.org/data/2.5/weather?q=";
let url_city_pt2 = '';
let url_temp_pt3 = "&units=imperial";
let url_key_pt4 = "&APPID=adac381187630c9f1781ee9507a2c326";

let fullURL = '';

//api variable for forecast
let url_forecast = "https://api.openweathermap.org/data/2.5/forecast?q=";

//check local storage
//if empty do nothing, if not, laod data
if (localStorage.getItem('dataKey') != '') {
    //console log
    console.log(JSON.parse(localStorage.getItem('dataKey')));
} else {
    alert('Local Storage is empty');
}

//create event listeners for dropdown items
weatherDropDown.addEventListener('click', e => {
    //set innertext of drop down menu
    dropdownMenuBtn.innerText = weatherDropDown.innerText;
});

forecastDropDown.addEventListener('click', e => {
    //set innerText of drop down menu
    dropdownMenuBtn.innerText = forecastDropDown.innerText;
});
//create keypress event to grab input
cityInput.addEventListener('keypress', e => {
    //accept value upon enter keypress
    if (e.keyCode === 13) {
        //determine if dropdown has been selected
        determineDrop()
        //get data
        getAPIdata(fullURL);
    }
});

function determineDrop(){
    if(dropdownMenuBtn.innerText === weatherDropDown.innerText){
        //set full url in event of current weather
        url_city_pt2 = cityInput.value + ",us";
        fullURL = url_pt1 + url_city_pt2 + url_temp_pt3 + url_key_pt4;
    } else if(dropdownMenuBtn.innerText === forecastDropDown.innerText){
        //set full url in event of forecast
        url_city_pt2 = cityInput.value + ",us";
        fullURL = url_forecast + url_city_pt2 + url_temp_pt3 + url_key_pt4;
    } else {
        //create alert if dropdown item is not selected
        alert('Select an option from drop down menu');
    }
}

function getAPIdata(url) {
    let xmlhttp = new XMLHttpRequest();
    //Put your weather API URL and KEY here
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let myArr = JSON.parse(this.responseText);
            if(dropdownMenuBtn.innerText === weatherDropDown.innerText){
                getWeather(myArr);
            } else if(dropdownMenuBtn.innerText === forecastDropDown.innerText){
                getForecast(myArr);
            }
        }
    };
    xmlhttp.open("GET", fullURL, true);
    xmlhttp.send();
}

function getWeather(info) {
    console.log(info);
    console.log(info.main.temp);
    console.log(info.weather[0].description);
    console.log(info.name);
    //create object to store essential info
    let cityObj = {
        cityName: info.name,
        cityWeather: info.weather[0].description,
        cityTemp: info.main.temp
    };
    console.log(cityObj);
    //push
    data.push(cityObj);
    //save
    saveData();
    //populate
    populateCard();
    //reset
    cityInput.value = '';
}

function getForecast(info){
    console.log(info);
    console.log(info.list[4].dt_txt);
    console.log(info.list[4].main.temp);
    console.log(info.city.name);
    console.log(info.list[4].weather[0].description);
}

function populateCard() {
    //eliminate
    eliminate(divtainer);
    //create card
    let popCard = document.createElement('div');
    let popImg = document.createElement('img');
    let popBody = document.createElement('div');
    let popTitle = document.createElement('h5');
    let popText1 = document.createElement('p');
    let popText2 = document.createElement('p');

    //add classes
    popCard.setAttribute('class', 'card');
    popCard.setAttribute('style', 'width:14rem;');
    popImg.setAttribute('class', 'card-img-top');

    //check castform
    popImg.setAttribute('src', '/images/normal.jpg');

    popBody.setAttribute('class', 'card-body text-center');
    popTitle.setAttribute('class', 'card-title');
    popText1.setAttribute('class', 'card-text');
    popText2.setAttribute('class', 'card-text');
    divtainer.setAttribute('class', 'mt-5 d-flex justify-content-center');

    //set innerText etc.
    popTitle.innerText = data[wIndex].cityName;
    popText1.innerText = data[wIndex].cityWeather;
    popText2.innerText = Math.round(data[wIndex].cityTemp) + String.fromCharCode(176) + "F";

    //increment
    wIndex++;

    //append children to card body
    popBody.appendChild(popTitle);
    popBody.appendChild(popText1);
    popBody.appendChild(popText2);
    //append children to card
    popCard.appendChild(popImg);
    popCard.appendChild(popBody);
    //append child to divtainer
    divtainer.appendChild(popCard);
}

//save function
function saveData() {
    localStorage.setItem('dataKey', JSON.stringify(data));
    console.log(data);
}

//delete function
function eliminate(her){
    while(her.firstChild){
        her.removeChild(her.firstChild);
    }
}