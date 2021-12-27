const express = require("express");
const webpush = require("web-push");
const subscribeMap = require('../store/subscriptionMap');

const app = express();

const publicVapidKey = process.env.SERVICE_WORKER_PUBLIC_KEY;
const privateVapidKey = process.env.SERVICE_WORKER_PRIVATE_KEY;

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

// Subscribe Route
const subscribe = async (req, res) => {

  // Get pushSubscription object
  const subscription = req.body;
  
  // Send 201 - resource created
  res.status(201).json({});

  const userId = req.user.id;

  if(!subscribeMap.has(userId)){
    subscribeMap.set(userId, new Set());
  }

  const s= JSON.stringify(subscription);
  subscribeMap.get(userId).add(s);             // store endpoint for the user

}

module.exports = {subscribe, webpush};