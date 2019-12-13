//create empty array to push weather into
let data;
//create an empty array to push forecast into
let castdata;

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
let deleteBtn = document.getElementById('deleteBtn');

let dropdownMenuBtn = document.getElementById('dropdownMenuButton');
let weatherDropDown = document.getElementById('weatherDropDown');
let forecastDropDown = document.getElementById('forecastDropDown');


//create counter for current weather
wIndex = 0;
fIndex = 0;

//api variables for weather
let url_pt1 = "https://api.openweathermap.org/data/2.5/weather?q=";
let url_city_pt2 = '';
let url_temp_pt3 = "&units=imperial";
let url_key_pt4 = "&APPID=adac381187630c9f1781ee9507a2c326";

let fullURL = '';

//api variable for forecast
let url_forecast = "https://api.openweathermap.org/data/2.5/forecast?q=";

//check for data
if (localStorage.getItem('dataKey')) {
    console.log('localStorage exists and has been loaded - current weather');
    //push into data
    data = JSON.parse(localStorage.getItem('dataKey'));
    //console log
    console.log(data);
    //populate
    populateCard();
} else {
    console.log('localStorage does not exist - current weather');
    //initialize data
    data = [];
}

//check for castdata
if (localStorage.getItem('castKey')) {
    //console log confirmation
    console.log('localStorage exists and has been loaded - forecast');
    //push into castdata
    castdata = JSON.parse(localStorage.getItem('castKey'));
    //console log
    console.log(castdata);
    //populate
    populateCards();
} else {
    //console log denial
    console.log('localStorage does not exist - forecast');
    //initialize castdata
    castdata = [];
}

//create event listeners for dropdown items
weatherDropDown.addEventListener('click', () => {
    //set innertext of drop down menu
    dropdownMenuBtn.innerText = weatherDropDown.innerText;
});

forecastDropDown.addEventListener('click', () => {
    //set innerText of drop down menu
    dropdownMenuBtn.innerText = forecastDropDown.innerText;
});

//create click events for buttons
prevBtn.addEventListener('click', () => {
    //determine current weather OR forecast
    if (dropdownMenuBtn.innerText === weatherDropDown.innerText){
        //perform action for weather
        if(wIndex > 0 && wIndex != 1){
            //decrement initial population
            wIndex--;
            //decrement to desired position
            wIndex--;
            //populate
            populateCard();
            //console log
            console.log('wIndex: ' + wIndex);
        } else {
            alert('Cannot decrement further');
        }
    } else if (dropdownMenuBtn.innerText === forecastDropDown.innerText) {
        //perform action for forecast
        if(fIndex > 0 && fIndex != 1){
            //decrement initial population
            fIndex--;
            //decrement to desired position
            fIndex--;
            //populate
            populateCards();
            //console log
            console.log('fIndex: ' + fIndex);
        } else {
            alert('Cannot decrement further');
        }
    }
    
});

nextBtn.addEventListener('click', () => {
    if(dropdownMenuBtn.innerText === weatherDropDown.innerText){
        //perform action for weather
        if(wIndex <= data.length-1){
            populateCard();
            console.log('wIndex: ' + wIndex);
        } else {
            alert('Cannot increment further');
        }
    } else if(dropdownMenuBtn.innerText === forecastDropDown.innerText){
        //perform action for forecast
        if(fIndex <= castdata.length-1){
            populateCards();
            console.log('fIndex: ' + fIndex);
        } else {
            alert('Cannot increment further');
            console.log('fIndex: ' + fIndex);
        }
    }
    
});

deleteBtn.addEventListener('click', () => {
    //create action for current weather
    if(dropdownMenuBtn.innerText === weatherDropDown.innerText){
        //remove object in data
        data.splice(wIndex-1, 1);
        console.log(data);
        //save update to data
        saveData();
        console.log(data);
        //decrement
        wIndex--;
        //repopulate
        if(wIndex < data.length-1){
            populateCard();
        } else {
            eliminate(divtainer);
        }
    } else if(dropdownMenuBtn.innerText === forecastDropDown.innerText){
        //create action for forecast
        //remove object in castdata
        castdata.splice(fIndex-1, 1);
        console.log(castdata);
        //save update to castdata
        saveCast();
        console.log(castdata);
        //removeItem if cast data is empty
        if(castdata.length <= 0){
            localStorage.removeItem('castKey');
        }
        //decrement
        fIndex--;
        //repopulate
        if(castdata.length > 0){
            fIndex = castdata.length-1;
            populateCards();
        } else {
            populateDefault();
            //reset index
            fIndex = 0;
        }
    }
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

function determineDrop() {
    let drop;
    if (dropdownMenuBtn.innerText === weatherDropDown.innerText) {
        //set full url in event of current weather
        url_city_pt2 = cityInput.value;
        fullURL = url_pt1 + url_city_pt2 + url_temp_pt3 + url_key_pt4;
        drop = true;
        return drop;
    } else if (dropdownMenuBtn.innerText === forecastDropDown.innerText) {
        //set full url in event of forecast
        url_city_pt2 = cityInput.value;
        fullURL = url_forecast + url_city_pt2 + url_temp_pt3 + url_key_pt4;
        drop = false;
        return drop;
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
            if (dropdownMenuBtn.innerText === weatherDropDown.innerText) {
                getWeather(myArr);
            } else if (dropdownMenuBtn.innerText === forecastDropDown.innerText) {
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

function getForecast(info) {
    console.log(info);
    console.log(info.list[4].dt_txt);
    console.log(info.list[4].main.temp);
    console.log(info.city.name);
    console.log(info.list[4].weather[0].description);
    //create Obj to push forecast data into
    let fiveDayCast = {
        cityName: info.city.name,
        //card 1
        date1: info.list[4].dt_txt.substring(0, 10),
        desc1: info.list[4].weather[0].description,
        temp1: info.list[4].main.temp,
        //card 2
        date2: info.list[12].dt_txt.substring(0, 10),
        desc2: info.list[12].weather[0].description,
        temp2: info.list[12].main.temp,
        //card 3
        date3: info.list[20].dt_txt.substring(0, 10),
        desc3: info.list[20].weather[0].description,
        temp3: info.list[20].main.temp,
        //card 4
        date4: info.list[28].dt_txt.substring(0, 10),
        desc4: info.list[28].weather[0].description,
        temp4: info.list[28].main.temp,
        //card 5
        date5: info.list[36].dt_txt.substring(0, 10),
        desc5: info.list[36].weather[0].description,
        temp5: info.list[36].main.temp
    };

    //console log
    console.log(fiveDayCast);
    //push to castdata
    castdata.push(fiveDayCast);
    //save to localStorage
    saveCast();
    //populate
    populateCards();
    //reset input
    cityInput.value = '';
}

function populateCard() {
    //eliminate
    if (divtainer.firstChild) {
        eliminate(divtainer);
    }
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
    popBody.setAttribute('class', 'card-body text-center');
    popTitle.setAttribute('class', 'card-title');
    popText1.setAttribute('class', 'card-text');
    popText2.setAttribute('class', 'card-text');
    divtainer.setAttribute('class', 'mt-5 d-flex justify-content-center');

    //set innerText etc.
    popTitle.innerText = data[wIndex].cityName;
    popText1.innerText = data[wIndex].cityWeather;
    popText2.innerText = Math.round(data[wIndex].cityTemp) + String.fromCharCode(176) + "F";

    //set castform
    let transform = getCastform(popText1.innerText);
    popImg.setAttribute('src', transform);

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

function populateCards() {

    //set innerText of Cards

    //heading
    cityHeader.innerText = castdata[fIndex].cityName;
    //card1
    card1Day.innerText = castdata[fIndex].date1;
    card1Desc.innerText = castdata[fIndex].desc1;
    card1Temp.innerText = Math.round(castdata[fIndex].temp1) + String.fromCharCode(176) + "F";
    card1Img.src = getCastform(card1Desc.innerText);
    //card2
    card2Day.innerText = castdata[fIndex].date2;
    card2Desc.innerText = castdata[fIndex].desc2;
    card2Temp.innerText = Math.round(castdata[fIndex].temp2) + String.fromCharCode(176) + "F";
    card2Img.src = getCastform(card2Desc.innerText);
    //card3
    card3Day.innerText = castdata[fIndex].date3;
    card3Desc.innerText = castdata[fIndex].desc3;
    card3Temp.innerText = Math.round(castdata[fIndex].temp3) + String.fromCharCode(176) + "F";
    card3Img.src = getCastform(card3Desc.innerText);
    //card4
    card4Day.innerText = castdata[fIndex].date4;
    card4Desc.innerText = castdata[fIndex].desc4;
    card4Temp.innerText = Math.round(castdata[fIndex].temp4) + String.fromCharCode(176) + "F";
    card4Img.src = getCastform(card4Desc.innerText);
    //card5
    card5Day.innerText = castdata[fIndex].date5;
    card5Desc.innerText = castdata[fIndex].desc5;
    card5Temp.innerText = Math.round(castdata[fIndex].temp5) + String.fromCharCode(176) + "F";
    card5Img.src = getCastform(card5Desc.innerText);

    //increment
    fIndex++;

}

function populateDefault(){
        //set innerText of Cards

    //heading
    cityHeader.innerText = 'City Name';
    //card1
    card1Day.innerText = 'Day';
    card1Desc.innerText = 'Description';
    card1Temp.innerText = 'Temp';
    card1Img.src = '/images/normal.jpg';
    //card2
    card2Day.innerText = 'Day';
    card2Desc.innerText = 'Description';
    card2Temp.innerText = 'Temp';
    card2Img.src = '/images/normal.jpg';
    //card3
    card3Day.innerText = 'Day';
    card3Desc.innerText = 'Description';
    card3Temp.innerText = 'Temp';
    card3Img.src = '/images/normal.jpg';
    //card4
    card4Day.innerText = 'Day';
    card4Desc.innerText = 'Description';
    card4Temp.innerText = 'Temp';
    card4Img.src = '/images/normal.jpg';
    //card5
    card5Day.innerText = 'Day';
    card5Desc.innerText = 'Description';
    card5Temp.innerText = 'Temp';
    card5Img.src = '/images/normal.jpg';
}

function getCastform(desc){
    //return correct path matching desc
    if(desc.includes('clear')){
        return "/images/sun.png";
    } else if(desc.includes('rain')){
        return "/images/rain.jpg";
    } else if(desc.includes('cloud')){
        return "/images/snow.jpg";
    } else {
        return "/images/normal.jpg";
    }
}

//save functions
function saveData() {
    localStorage.setItem('dataKey', JSON.stringify(data));
    console.log(data);
}

function saveCast() {
    localStorage.setItem('castKey', JSON.stringify(castdata));
    console.log(castdata);
}

//delete functions
function eliminate(her) {
    while (her.firstChild) {
        her.removeChild(her.firstChild);
    }
}