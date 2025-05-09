const ENV = process.env.NODE_ENV || "development";
require("dotenv").config({
  path: `.env.${ENV}`,
});

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter=require('./routers/useRouter');
const helmet = require("helmet");
const compression = require("compression");
const app = express();
const morgan = require("morgan");
const fs = require("fs");
const rateLimit=require('express-rate-limit');


const url = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@xdb.mjwzy.mongodb.net/${process.env.MONGO_DB_DATABASE}`;

app.use(
  cors({
    origin: process.env.ORIGIN_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  })
);

// Set up Morgan to log HTTP requests to a file

app.use(morgan('combined'));

const staticPath = path.join(__dirname, "../Frontend/dist");
app.use(express.static(staticPath));

const {errorHandlers} = require("./controllers/errorHandler");

const {conversationRouter} = require("./routers/conversationRouter"); 

// const limiter=rateLimit({
//   windowMs:1*60*1000,
//   max:10,
//   message:"Too many requests from this IP, please try again after an minute"
// })

// app.use(limiter);
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use((req, res, next) => {
  console.log("Request Recived");
  console.log(req.url);
  console.log("Req body",req.body);
  next();
});

app.use("/api", conversationRouter);

app.use("/api/user",userRouter);
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../Frontend/dist", "index.html"));
// });

app.use(errorHandlers);


const port = process.env.PORT || 4000;

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to the database");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
});


