import { ClusterClient, InteractionCommandClient } from "detritus-client";
import { DISCORD_TOKEN } from "./lib/EnvValues";
import { readdirSync } from "fs";

const bot = new InteractionCommandClient(DISCORD_TOKEN, {
  useClusterClient: true,
});

// Adding interaction commands
bot.addMultipleIn("./src/commands");

// Adding Events
readdirSync("./events").forEach((file) => {
  const path = process.cwd() + "/events/" + file;
  import(path).then((event) => {
    event.default(bot);
  });
});

bot.run();
