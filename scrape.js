const request = require('request');
const cheerio = require('cheerio');

request('http://citiram.net/citati/tema/motivacija/', (err, res, body) => {
    const $ = cheerio.load(body);
    $('h2').each((index, elem) => console.log($(elem).text()));
    $('.author').each((index, elem) => console.log($(elem).text()));
});
