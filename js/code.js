//create empty array to push data into
let data = [];


//grab input
let cityInput = document.getElementById('cityInput');

//api variables
let url_pt1 = "https://api.openweathermap.org/data/2.5/weather?q=";
let url_city_pt2 = '';
let url_temp_pt3 = "&units=imperial";
let url_key_pt4 = "&APPID=adac381187630c9f1781ee9507a2c326";

let fullURL = '';

//check local storage
//if empty do nothing, if not, laod data
if (localStorage.getItem('dataKey') != '') {
    //console log
    console.log(JSON.parse(localStorage.getItem('dataKey')));
} else {
    alert('Local Storage is empty');
}

//create keypress event to grab input
cityInput.addEventListener('keypress', e => {
    //accept value upon enter keypress
    if (e.keyCode === 13) {
        url_city_pt2 = cityInput.value + ",us";
        fullURL = url_pt1 + url_city_pt2 + url_temp_pt3 + url_key_pt4;
        getAPIdata(fullURL);
    }
});

function getAPIdata(url) {
    let xmlhttp = new XMLHttpRequest();
    //Put your weather API URL and KEY here
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let myArr = JSON.parse(this.responseText);
            getWeather(myArr);
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

function populateCard() {
    //create card
    let popCard = document.createElement('div');
    let popImg = document.createElement('img');
    let popBody = document.createElement('div');
    let popTitle = document.createElement('h5');
    let popText1 = document.createElement('p');
    let popText2 = document.createElement('p');

    //add classes
    popCard.setAttribute('class', 'card');
    popCard.setAttribute('style', 'width:18rem;')
    popImg.setAttribute('class', 'card-img-top');
    popImg.setAttribute('src', '/images/normal.jpg');
    popBody.setAttribute('class', 'card-body text-center');
    popTitle.setAttribute('class', 'card-title');
    popText1.setAttribute('class', 'card-text');
    popText2.setAttribute('class', 'card-text');

    //set innerText etc.
    popTitle.innerText = '';
    //append to divtainer
}

//save function
function saveData() {
    localStorage.setItem('dataKey', JSON.stringify(data));
    console.log(data);
}