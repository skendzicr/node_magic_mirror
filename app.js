'use strict';

const express = require('express');
const app = express();
const port = 5000;

app.use(express.static('public'));
app.use(express.static('src'));

app.get('/', (req,res)=>{
  res.send('Hello World');
});

app.listen(port, (err)=>{
  console.log('Listening on port', + port);
});
