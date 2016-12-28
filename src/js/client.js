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

let forecastDays = getElement('forecast-days');
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

const getForecast = (data)=>{
    if (data !== undefined) removeChildren(forecastDays);
    forecastWeather = data.forecastWeather.list;
    for (let day of forecastWeather) {
        let forecastDay = document.createElement('li');
        forecastDay.innerText = day.temp.day;
        forecastDays.appendChild(forecastDay);
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
    let wind = data.wind.speed;
    let prefix = 'wi wi-wind-beaufort-';
    let windStrength = util.beaufortScale(wind);
    windIcon.className = prefix + windStrength;
};
const getWeather = (data) =>{
    let prefix = 'wi wi-';
    currentWeather = data.currentWeather;
    getWind(currentWeather);
    let code = currentWeather.weather[0].id;
    let icon = weatherIcons[code].icon;
    if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
        icon = 'day-' + icon;
    }
    weatherIcon.className = prefix + icon;
    Weather.innerText = currentWeather.main.temp;
};


socket.on('feed', function (data) {
    getForecast(data);
    getNews(data);
    getWeather(data);
    console.log(data);
});

getTime();
