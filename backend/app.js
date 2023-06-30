const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const colors = require('colors');
const dotenv = require('dotenv');

const authRouter = require("./routes/auth");
const tasksRouter = require("./routes/tasks");

const app = express();

//Setting up environment file location
dotenv.config({path: './config/config.env'});

//DB connection
mongoose.connect(process.env.MONGO_URI).then(()=>console.log('Connected to DB'.green)).catch(err=>console.log('Failed to connect to DB'.red));

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//JSON format by default
app.use(express.json());

//Adjusting the CORS
app.use(cors());

//Routes
app.use("/api", authRouter);
app.use("/api", tasksRouter);

app.listen(3000);
