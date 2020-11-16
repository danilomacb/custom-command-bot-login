const mongoose = require("mongoose");

const DiscordServerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  discordServerId: { type: String, required: true },
  discordUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  discordAdmins: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("DiscordServer", DiscordServerSchema);
