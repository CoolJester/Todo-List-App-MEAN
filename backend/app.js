const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRouter = require("./routes/auth");
const tasksRouter = require("./routes/tasks");

const app = express();

//Adding morgan
app.use(morgan("dev"));

//JSON format by default
app.use(express.json());

//Adjusting the CORS
app.use(cors());

//Routes

app.listen(3000);
