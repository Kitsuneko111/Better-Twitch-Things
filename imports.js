const tmi = require("tmi.js");
const store = require("data-store")({ path: "channels.json" });
const channels = store.get("channels");
require("dotenv").config();
const client = new tmi.Client({
  channels: ["Timemaster69"].concat(channels),
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
