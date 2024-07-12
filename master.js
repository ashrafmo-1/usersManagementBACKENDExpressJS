const express = require("express");
const app = express();
var cors = require('cors')
require('dotenv').config()
const usersRouter = require("./routes/users.route");
const mongoose = require("mongoose");
const httpStatus = require("./utils/http.status");
const url = process.env.MONGO_DB_URL;

mongoose.connect(url).then(() => {
  console.log("Connect success for DB");
}).catch(err =>  console.log(err));

app.use(cors())
app.use(express.json()); 
app.use("/api/users", usersRouter);

//! not implemented yet;
app.all('*', (req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    code: error.statusCode || 500,
    message: error.statusText || 'invalid status',
    error: error.message || 'invalid status',
    data: null
  });
})

app.listen(process.env.PORT);