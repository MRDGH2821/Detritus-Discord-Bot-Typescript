import { InteractionCommandClient } from "detritus-client";
import { DISCORD_TOKEN } from "./lib/EnvValues";
import { resolve } from "path";
import { readdir } from "fs/promises";

async function main() {
  const bot = new InteractionCommandClient(DISCORD_TOKEN, {
    useClusterClient: true,
  });

  // Adding interaction commands
  await bot.addMultipleIn("./commands");

  // Adding events
  const eventsDir = resolve(__dirname, "events");

  await readdir(eventsDir).then((files) =>
    files.forEach((file) => {
      const path = resolve(eventsDir, file);
      import(path).then((event) => {
        const fn = event.default;
        bot.client.on(fn.event, fn.run);
      });
    })
  );

  bot.run();
}

main();
