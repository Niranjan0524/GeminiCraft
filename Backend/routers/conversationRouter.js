const express = require('express');

const conversationRouter = express.Router();
const {newConversation} = require("../controllers/conversationController");

const {newMessage} = require("../controllers/conversationController");

conversationRouter.post("/conversation", newConversation);

//this router is for the updating the existing conversation:

conversationRouter.put("/conversation/:id",newMessage );

exports.conversationRouter = conversationRouter;