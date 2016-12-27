'use strict';
const { config } = require('./config.js');
const express = require('express');
const request = require('superagent');
const app = express();
const port = 3000;
const server = app.listen(port, (err)=>{
    console.log('Listening on port', +port);
});
const io = require('socket.io')(server);
let weatherObj = {};

app.use(express.static('dist'));

function getCurrentWeather() {
    return request
    .get(config.currentWeather);
}
function getForecast() {
    return request
  .get(config.forecastWeather);
}
function getNews() {
    return request
  .get(config.news);
}

function prepareFeed() {
    getCurrentWeather()
.then((currentWeather)=>{
    weatherObj.currentWeather = JSON.parse(currentWeather.text);
    return getForecast();
})
.then((forecastWeather)=>{
    weatherObj.forecastWeather = JSON.parse(forecastWeather.text);
    return getNews();
})
.then((news)=>{
    weatherObj.news = JSON.parse(news.text).responseData.feed.entries;
    return weatherObj;
})
.catch((err)=>{
    console.log('Houston we have a problem', err);
});
}

io.on('connection', (socket)=>{
    prepareFeed();
    socket.emit('feed', weatherObj);
    setInterval(()=>{
        console.log('Fetching news and weather');
        prepareFeed();
        socket.emit('feed', weatherObj);
    }, 60000);
});
