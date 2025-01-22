
const ENV = process.env.NODE_ENV || "development";
require("dotenv").config({
  path: `.env.${ENV}`,
});

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const app = express();

// const cors = require("cors");

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  })
);

// app.use(express.static(path.join(__dirname, "../Frontend/dist")));

const {errorHandlers} = require("./controllers/errorHandler");

const {conversationRouter} = require("./routers/conversationRouter"); 

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log("Request Recived");
  console.log(req.url);
  console.log("Req body",req.body);
  next();
});

app.use("/api", conversationRouter);

app.use(errorHandlers);

const port = process.env.PORT || 3000;


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
 


