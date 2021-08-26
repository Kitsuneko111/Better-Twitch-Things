#!/usr/bin/env zx

const { client, messageCache } = require("./imports");

client.connect().catch(console.error);

client.on("message", (channel, tags, message, self) => {
  if (self) return;
  if (message.startsWith(`@${client.username}`)) {
  } else {
    let user;
    if (messageCache[channel]) user = messageCache[channel][tags.id];
    else {
      messageCache[channel] = {};
      messageCache[channel][tags.id.toString()] = {};
      user = messageCache[channel][tags.id.toString()];
      user.messages = [];
      console.log(messageCache);
      console.log(messageCache[channel]);
      console.log(messageCache[channel][tags.id.toString()].messages);
      console.log(user.messages);
    }
    user.messages.push(message);
    if (user.messages.length > 10) user.messages.splice(0, 1);
    let totalChannelMessages = 0;
    let highestMessages = [0, null];
    for (const [id, member] of Object.entries(messageCache[channel])) {
      console.log(member);
      totalChannelMessages += member.messages.length;
      if (member.messages.length > highestMessages[0]) {
        highestMessages[0] = member.messages.length;
        highestMessages[1] = member;
      }
    }
    if (totalChannelMessages > 150) {
      highestMessages[1].messages.splice(0, 1);
    }
  }
});

question("").then(() => {
  console.log("ending");
  client.disconnect();
  process.exit();
});
