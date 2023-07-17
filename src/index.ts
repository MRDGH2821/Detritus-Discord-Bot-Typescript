import {
  ClusterClient,
  CommandClient,
  InteractionCommandClient,
} from "detritus-client";
import { DISCORD_TOKEN } from "./lib/EnvValues";
import { resolve } from "path";
import { readdir } from "fs/promises";
import { GatewayIntents } from "detritus-client/lib/constants";
import { CommandOptions } from "detritus-client/lib/command";

async function main() {
  const baseBot = new ClusterClient(DISCORD_TOKEN, {
    gateway: {
      intents: [GatewayIntents.DIRECT_MESSAGES, GatewayIntents.GUILD_MESSAGES],
    },
  });

  // Adding events
  const eventsDir = resolve(__dirname, "events");

  await readdir(eventsDir).then((files) =>
    files.forEach((file) => {
      const path = resolve(eventsDir, file);
      import(path).then(
        (event: {
          default: {
            event: string;
            run: (...args: unknown[]) => unknown;
          };
        }) => {
          const fn = event.default;
          baseBot.on(fn.event, fn.run);
        }
      );
    })
  );

  // Slash Command bot
  const slashBot = new InteractionCommandClient(baseBot);

  // Add interaction commands
  await slashBot.addMultipleIn("./commands");

  // Prefix Command bot
  const prefixBot = new CommandClient(slashBot, {
    prefix: "d!",
    prefixes: ["!", "$"],
    gateway: {
      intents: [GatewayIntents.DIRECT_MESSAGES, GatewayIntents.GUILD_MESSAGES],
    },
    mentionsEnabled: true,
  });

  // Add prefix commands
  const prefixCmdDir = resolve(__dirname, "prefixCommands");
  await readdir(prefixCmdDir).then((files) =>
    files.forEach((file) => {
      const path = resolve(prefixCmdDir, file);
      import(path).then((event: { default: CommandOptions }) => {
        const cmd = event.default;
        prefixBot.add(cmd);
      });
    })
  );

  prefixBot.add(
    {
      name: "ping",
    },
    async (ctx) => {
      const ping = await ctx.client.ping();
      console.log(ctx.content);
      await ctx.editOrReply(
        `Pong! \`\`\`json\n${JSON.stringify(ping, null, 2)} \n\`\`\``
      );
    }
  );

  await prefixBot.run().then(() => console.log("Prefix bot is ready!"));
  await slashBot.run().then(() => console.log("Slash bot is ready!"));
  await baseBot.run().then(() => console.log("Base bot is ready!"));
}

main();
