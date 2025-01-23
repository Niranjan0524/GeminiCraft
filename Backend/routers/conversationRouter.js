const express = require('express');
const conversationRouter = express.Router();


const {newConversation} = require("../controllers/conversationController");

const {newMessage} = require("../controllers/conversationController");

const { getConversation } = require("../controllers/conversationController");

const {deleteConversation} = require("../controllers/conversationController");

conversationRouter.post("/conversation", newConversation);

//this router is for the updating the existing conversation:
conversationRouter.put("/conversation/:id",newMessage );

conversationRouter.get("/conversation", getConversation);

conversationRouter.delete("/conversation/:id", deleteConversation);

exports.conversationRouter = conversationRouter;