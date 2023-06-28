const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

//Adding morgan
app.use(morgan('dev'));

//JSON format by default
app.use(express.json());

app.use('/', (req, res, next)=>{
  console.log(req.body);
});

app.listen(3000);
