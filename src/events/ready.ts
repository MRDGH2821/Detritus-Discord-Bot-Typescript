import { GatewayClientEvents, ShardClient } from "detritus-client";
import { ClientEvents } from "detritus-client/lib/constants";
const readyEvent = {
  event: ClientEvents.GATEWAY_READY,
  run(args: GatewayClientEvents.GatewayReady & { shard: ShardClient }) {
    const { shard } = args;
    console.log(
      "Logged in as:",
      shard.user?.username + "#" + shard.user?.discriminator
    );
    shard.rest.fetchApplicationCommands(shard.userId).then((commands) => {
      console.log("Global Commands: ", commands.length);
    });
  },
};
export default readyEvent;
