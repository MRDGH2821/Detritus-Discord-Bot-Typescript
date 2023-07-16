import { InteractionCommand } from "detritus-client/lib/interaction";

export default new InteractionCommand({
  name: "ping",
  description: "Gives you the ping of the bot",
  async run(ctx) {
    const ping = await ctx.client.ping();
    await ctx.editOrRespond(
      `Pong! \`\`\`json\n${JSON.stringify(ping, null, 2)} \n\`\`\``
    );
  },
});
