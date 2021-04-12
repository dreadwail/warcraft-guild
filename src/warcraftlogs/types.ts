import { GuildRequest } from "../types";

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
