'use strict';
const { config } = require('./config.js');
const express = require('express');
const request = require('superagent');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(express.static('./src/views'));

function getCurrentWeather() {
  return request
  .get(config.currentWeather)
}
function getForecast() {
  return request
  .get(config.forecastWeather)
}
function getNews() {
  return request
  .get(config.news);
}

app.get('/',(req,res)=>{
  res.render('index')
})

app.get('/feed', (req,res)=>{
  const weatherObj = {};
  
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
    console.log(news.text);
    weatherObj.news = JSON.parse(news.text).responseData.feed.entries;
    res.send(weatherObj);
  })
  .catch((err)=>{
    console.log("Houston we have a problem",err);
  })
});


app.listen(port, (err)=>{
  console.log('Listening on port', + port);
});
