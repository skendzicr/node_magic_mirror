require('../scss/main');
require('../scss/weather-icons');
require('../scss/weather-icons.wind');
import util from './util';
import weatherIcons from './icons';
import motivation from './motivation';
import convert from 'latin-to-serbian-cyrillic';
import moment from 'moment/min/moment-with-locales';
moment.locale('sr');

const socket = io.connect('http://localhost:3000');

const getElement = elementId => document.getElementById(elementId);
const removeChildren = (node) => {
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
};

const toCapitalCase = string => string.charAt(0).toUpperCase() + string.slice(1);

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
    now.locale('sr');
    date.innerText = convert(toCapitalCase(now.format('dddd'))) + ', ' + convert(toCapitalCase(now.format('MMMM Do YYYY')));
    time.innerText = now.format('LT');
    seconds.innerText = now.seconds() < 10 ? '0' + now.seconds() : now.seconds();
    setTimeout(getTime, 1000);
};

socket.on('connect', () => console.log('Socket Connected to Node Mirror App'));

const getIcon = code => {
    let prefix = 'wi wi-';
    let icon = weatherIcons[code].icon;
    if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
        icon = `${prefix}day-${icon}`;
    } else {
        icon = prefix + icon;
    }
    return icon;
};

const getForecast = data => {
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
        degreeSign.className = 'wi wi-degrees';

        let degreeSign2 = degreeSign.cloneNode();

        let weekday = document.createElement('div');
        weekday.innerText = convert(moment.unix(day.dt).format('ddd'));
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
let index = 0;
let timeout;

const changeNews = () =>{
    timeout = setTimeout(changeNews, 15000);
    if (index === newsData.length) {
        return;
    }
    let publishedDate = getElement('latest-news-date');
    let newsTitle = getElement('latest-news-title');
    let newsContent = getElement('latest-news-content');
    newsTitle.innerText = convert(newsData[index].title[0]);
    newsContent.innerText = convert(newsData[index].description[0]);
    let hoursAgo = new Date(newsData[index].pubDate[0]);
    publishedDate.innerText = 'N1Info: ' + convert(moment(hoursAgo).locale('sr').fromNow());
    index += 1;
};

const getNews = data =>{
    let newsColumn = getElement('latest-news');
    newsData = data.news;
    index = 0;
    clearTimeout(timeout);
    changeNews();
    newsColumn.classList.contains('animate') ? false : newsColumn.className += ' animate';
};

const getWind = data => {
    let windIcon = getElement('wind-icon');
    let windStrength = getElement('wind-strength');
    let wind = data.wind.speed;
    let prefix = 'wind-icon wi wi-wind-beaufort-';
    let beaufort = util.beaufortScale(wind);
    windIcon.className = prefix + beaufort;
    windStrength.innerText = wind + 'm/s';
};


const getWeather = data =>{
    let prefix = 'weather-icon wi wi-';
    currentWeather = data.currentWeather;
    getWind(currentWeather);
    let code = currentWeather.weather[0].id;
    let icon = getIcon(code);
    weatherIcon.className = prefix + icon;
    Weather.innerText = parseFloat(currentWeather.main.temp).toFixed(1);
};

const getQuote = () => {
    let author = getElement('motivation-author');
    let quote = getElement('motivation-quote');
    let random = Math.floor(Math.random() * 30) + 1;

    quote.innerText = motivation[random].motivation;
    author.innerText = '- ' + motivation[random].author;
};


socket.on('feed', data => {
    getForecast(data);
    getNews(data);
    getWeather(data);
    getQuote();
});

getTime();
