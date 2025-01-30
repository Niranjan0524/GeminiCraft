
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

const app = express();

const url = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@xdb.mjwzy.mongodb.net/${process.env.MONGO_DB_DATABASE}`;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  })
);

// app.use(express.static(path.join(__dirname, "../Frontend/dist")));

const {errorHandlers} = require("./controllers/errorHandler");

const {conversationRouter} = require("./routers/conversationRouter"); 

const session=require("express-session")
const mongodbStore=require("connect-mongodb-session")(session);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const store=new mongodbStore({
  uri:url,
  collection:"sessions"
})

app.use(
  session({
    secret:"my new secret",
    resave:false,
    saveUninitialized:false,
    store:store,
  })
);

app.use((req, res, next) => {
  if (req.get("cookie")) {
    req.isLoggedIn = req.get("Cookie").split("=")[1] === "true";
  }
  next();
});

app.use((req, res, next) => {
  console.log("Request Recived");
  console.log(req.url);
  console.log("Req body",req.body);
  next();
});

app.use("/api", conversationRouter);

app.use("/user",userRouter);

app.use(errorHandlers);

const port = process.env.PORT || 3000;

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


