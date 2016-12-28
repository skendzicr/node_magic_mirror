require('../scss/main');
require('../scss/weather-icons');
require('../scss/weather-icons.wind');
const util = require('./util');
const weatherIcons = require('./icons');

import moment from 'moment';
const socket = io.connect('http://localhost:3000');

const getElement = elementId => document.getElementById(elementId);
const removeChildren = (node) => {
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
};

const toCapitalCase = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
};

moment.locale('sr');

let currentWeather;
let forecastWeather;
let newsData;

let date = getElement('current-date');
let time = getElement('current-time');
let seconds = getElement('current-seconds');

let forecastDays = getElement('forecast-days-column');
let Weather = getElement('current-weather');
let weatherIcon = getElement('weather-icon');

const getTime = () =>{
    const now = moment();
    date.innerText = toCapitalCase(moment().format('dddd')) + ', ' + toCapitalCase(now.format('MMMM Do YYYY'));
    time.innerText = now.format('LT');
    seconds.innerText = now.seconds() < 10 ? '0' + now.seconds() : now.seconds();
    setTimeout(getTime, 1000);
};

socket.on('connect', () => console.log('Socket Connected to Node Mirror App'));

const getIcon = (code) => {
    let prefix = 'wi wi-';
    let icon = weatherIcons[code].icon;
    if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
        icon = prefix + 'day-' + icon;
    } else {
        icon = prefix + icon;
    }
    return icon;
};

const getForecast = (data)=>{
    if (data !== undefined) removeChildren(forecastDays);
    forecastWeather = data.forecastWeather.list;
    for (let day of forecastWeather) {
        let forecastDay = document.createElement('div');
        forecastDay.className = 'flex-row';

        let forecastMax = document.createElement('div');
        let tempMax = document.createElement('span');
        tempMax.innerText = day.temp.max;
        forecastMax.className = 'flex-basis text-align-right';

        let forecastMin = document.createElement('div');
        let tempMin = document.createElement('span');
        tempMin.innerText = day.temp.min;
        forecastMin.className = 'flex-basis text-align-right';

        let degreeSign = document.createElement('i');
        degreeSign.className = 'wi wi-degrees flex-basis';

        let degreeSign2 = degreeSign.cloneNode();

        let weekday = document.createElement('div');
        weekday.innerText = moment.unix(day.dt).format('ddd');
        weekday.className = 'flex-basis';

        let forecastIcon = document.createElement('i');
        let icon = getIcon(day.weather[0].id);
        forecastIcon.className = icon + ' fixed-width flex-basis';

        forecastDays.appendChild(forecastDay);
        forecastDay.appendChild(weekday);
        forecastDay.appendChild(forecastIcon);
        forecastDay.appendChild(forecastMax);
        forecastDay.appendChild(forecastMin);
        forecastMax.appendChild(tempMax);
        forecastMax.appendChild(degreeSign);
        forecastMin.appendChild(tempMin);
        forecastMin.appendChild(degreeSign2);
    }
};

const getNews = (data)=>{
    newsData = data.news;
    let publishedDate = getElement('latest-news-date');
    let newsTitle = getElement('latest-news-title');
    let newsContent = getElement('latest-news-content');


    newsTitle.innerText = newsData[0].title;
    newsContent.innerText = newsData[0].content;
    publishedDate.innerText = 'N1Info: ' + moment(newsData[0].publishedDate).fromNow();
};

const getWind = (data) => {
    let windIcon = getElement('wind-icon');
    let windStrength = getElement('wind-strength');
    let wind = data.wind.speed;
    let prefix = 'wind-icon wi wi-wind-beaufort-';
    let beaufort = util.beaufortScale(wind);
    windIcon.className = prefix + beaufort;
    windStrength.innerText = wind + 'm/s';
};


const getWeather = (data) =>{
    let prefix = 'weather-icon wi wi-';
    currentWeather = data.currentWeather;
    getWind(currentWeather);
    let code = currentWeather.weather[0].id;
    let icon = getIcon(code);
    weatherIcon.className = prefix + icon;
    Weather.innerText = parseFloat(currentWeather.main.temp).toFixed(1);
};


socket.on('feed', function (data) {
    getForecast(data);
    getNews(data);
    getWeather(data);
    console.log(data);
});

getTime();
