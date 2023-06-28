const express = require('express');
const morgan = require('morgan');
const app = express();

//Adding morgan
app.use(morgan());

app.listen(3000);
