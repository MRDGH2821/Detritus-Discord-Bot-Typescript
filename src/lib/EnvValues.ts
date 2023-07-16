import { config } from "dotenv";

config();

if (!process.env.DISCORD_TOKEN) {
  throw new Error("DISCORD_TOKEN is not defined");
}

export const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
