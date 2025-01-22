const express = require('express');

const conversationRouter = express.Router();
const {newConversation} = require("../controllers/conversationController");

conversationRouter.post("/conversation", newConversation);

exports.conversationRouter = conversationRouter;