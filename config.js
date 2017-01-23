const apiKey = '4e01b54427d7b552a713272a3cd20ba2';
const host = 'http://api.openweathermap.org/data/2.5/';

const openWeatherApiConfig = {
    currentWeather: host + 'weather?q=NoviSad&units=metric&appid=' + apiKey,
    forecastWeather: host + 'forecast/daily?q=NoviSad&units=metric&cnt=5&appid=' + apiKey,
    news: 'http://rs.n1info.com/rss/1/N1-info'
}

module.exports.config = openWeatherApiConfig;
