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
let xml2js = require('xml2js');
let weatherObj = {};
let sockets = [];

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
    return getCurrentWeather()
.then((currentWeather)=>{
    weatherObj.currentWeather = JSON.parse(currentWeather.text);
    return getForecast();
})
.then((forecastWeather)=>{
    weatherObj.forecastWeather = JSON.parse(forecastWeather.text);
    return getNews();
})
.then((news)=>{
    let parser = new xml2js.Parser();
    parser.parseString(news.text, (err, res)=>{
        weatherObj.news = res.rss.channel[0].item;
    });
    return weatherObj;
})
.catch((err)=>{
    console.log('Houston we have a problem', err);
});
}

prepareFeed();

setInterval(()=>{
    console.log('Fetching news...');
    prepareFeed()
  .then(() => {
      sockets.forEach(item => item.socket.emit('feed', weatherObj));
  });
}, 60000);

io.on('connection', (socket)=>{
    socket.emit('feed', weatherObj);
    const uuid = Math.random().toString(36).substring(7);
    sockets.push({
        uuid,
        socket
    });
    socket.on('disconnect', () => {
        sockets = sockets.filter(item => item.uuid !== uuid);
    });
});
