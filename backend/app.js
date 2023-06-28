const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

//Adding morgan
app.use(morgan('dev'));

//JSON format by default
app.use(express.json());

//Adjusting the CORS
app.use(cors());

app.use('/', (req, res, next)=>{
  console.log(req.body);
});

app.listen(3000);
