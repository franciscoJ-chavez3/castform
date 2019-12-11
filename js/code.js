//create empty array to push data into
let data = [];

//grab input
let cityInput = document.getElementById('cityInput');

//api variables
let url_pt1 = "https://api.openweathermap.org/data/2.5/weather?q=";
let url_city_pt2 = '';
let url_temp_pt3="&units=imperial";
let url_key_pt4="&APPID=adac381187630c9f1781ee9507a2c326";

let fullURL = '';

//create keypress event to grab input
cityInput.addEventListener('keypress', e => {
    //accept value upon enter keypress
    if(e.keyCode === 13){
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
        cityName : info.name,
        cityWeather : info.weather[0].description,
        cityTemp : info.main.temp
    };
    console.log(cityObj);
    //push
    data.push(cityObj);
    //save
    saveData();
    //populate
    
    //reset
    cityInput.value = '';
}

function saveData(){
    localStorage.setItem('dataKey', JSON.stringify(data));
    console.log(data);
}