import { ClientEvents } from "detritus-client/lib/constants";
import { EventSpewer, EventSubscription } from "detritus-utils";
const readyEvent = (client: EventSpewer) =>
  new EventSubscription(client, ClientEvents.READY, (args) => {
    console.log(args);
  });
export default readyEvent;
