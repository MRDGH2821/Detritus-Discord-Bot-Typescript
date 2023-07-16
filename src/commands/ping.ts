import { InteractionCommand } from "detritus-client/lib/interaction";

export default new InteractionCommand({
  name: "ping",
  description: "Gives you the ping of the bot",
  async run(ctx) {
    await ctx.editOrRespond(`Pong! ${await ctx.client.ping()}ms`);
  },
});
