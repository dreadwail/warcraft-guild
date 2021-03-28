import { GuildRequest } from "../types";

export type AttendanceGuildRequest = GuildRequest & {
  clientId: string;
  clientSecret: string;
};

export type TokenResponse = {
  access_token: string;
};

export type AttendanceQuery = {
  serverRegion: GuildRequest["serverRegion"];
  serverSlug: string;
  guildName: GuildRequest["guildName"];
  page: number;
  limit: number;
};
