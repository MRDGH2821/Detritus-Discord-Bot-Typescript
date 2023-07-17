import { CommandOptions } from "detritus-client/lib/command";

const cmd: CommandOptions = {
  name: "ping-p",
  async run(ctx) {
    const ping = await ctx.client.ping();
    await ctx.editOrReply(
      `Pong! \`\`\`json\n${JSON.stringify(ping, null, 2)} \n\`\`\``
    );
  },
};

export default cmd;
