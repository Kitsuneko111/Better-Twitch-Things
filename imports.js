const tmi = require("tmi.js");
require("dotenv").config();
const client = new tmi.Client({
  channels: ["Timemaster69"],
  options: {
    debug: true,
    messageLogLevel: "info",
  },
  connection: {
    reconnect: true,
    secure: true,
  },
  identity: {
    username: "BetterTwitchThings111",
    password: process.env.oauth,
  },
});
let messageCache = {};
console.log("efficiency check");
module.exports = {
  messageCache: messageCache,
  client: client,
  tmi: tmi,
};
