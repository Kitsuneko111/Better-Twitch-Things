#!/usr/bin/env zx

const { client, messageCache } = require("./imports");

const Discord = require("discord.js");
const discClient = new Discord.Client({
  intents: ["GUILDS", "DIRECT_MESSAGES", "GUILD_MESSAGES"],
});

const Database = require("sqlite-async");

await Database.open("channels.db");

const mode = "DEBUG";

client.on("message", async (channel, tags, message, self) => {
  if (self) return;
  console.log(tags.username);
  if (tags.username == "timemaster_111" && message == "!!!test!!!") {
    client.say(channel, "Listening in (you are not in followers only mode)");
    const guild = await discClient.guilds.fetch("682863690047029248");
    const debugChannel = await guild.channels.fetch("887425121697017948");
    debugChannel.send(`received test message`);
  }
  /*
  WIP
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
  */
});

client.on("action", async (channel, userstate, message, self) => {
  if (self) return;
  banState = 0;
  if (!userstate.username) return;
  if (
    /(\.*[0-9]+|_+|-+)*h(o|0)(s|$|t){2}([0-9]+|_+|-+)*.*/.test(
      userstate.username.toLowerCase()
    )
  ) {
    banState = 2;
    if (/.*(o|0){2}3(1|i|l)2.*/.test(userstate.username.toLowerCase())) {
      banState = 3;
    }
  }
  if (banState >= 2 && mode != "DEBUG") {
    await client.whisper(
      userstate.username,
      "Your name has been banned for having connections with a blocked username. In this case your username has been associated with IP grabber of username HOSS00312." +
        `${
          banState == 3
            ? ""
            : "If you believe this is in error you can appeal the ban."
        }`
    );
    client.ban(
      channel,
      userstate.username,
      "username assosciated with HOSS00312"
    );
  } else if (mode == "DEBUG") {
    const guild = await discClient.guilds.fetch("682863690047029248");
    const debugChannel = await guild.channels.fetch("887425121697017948");
    debugChannel.send(
      `${userstate.username} registered with hoss account (event type${message})`
    );
  }
});

discClient.on("ready", async () => {
  const guild = await discClient.guilds.fetch("682863690047029248");
  const debugChannel = await guild.channels.fetch("887425121697017948");
  debugChannel.send(`ready`);
});

question("").then(() => {
  console.log("ending");
  client.disconnect();
  discClient.disconnect();
  process.exit();
});
client.connect().catch(console.error);
discClient.login(process.env.TOKEN);
