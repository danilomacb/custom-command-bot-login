require("dotenv").config();

const Discord = require("discord.js");

const client = new Discord.Client();

const prefix = "$";

client.on("ready", () => {
  console.log("Bot running");
});

client.on("message", (message) => {
  if (message.content === prefix + "ping") {
    message.channel.send("pong");
  }
});

client.login(process.env.DISCORD_TOKEN);
