import { EventHandler } from "@create-figma-plugin/utilities"

export interface GetAllStickies extends EventHandler {
  name: "GET_ALL_STICKIES"
  handler: () => void
}

export interface SendAllStickies extends EventHandler {
  name: "SEND_ALL_STICKIES"
  handler: (data: [string, StickyNode[]][]) => void
}

export interface GetAuthorStickies extends EventHandler {
  name: "GET_AUTHOR_STICKIES"
  handler: (author: string) => void
}

export interface SendAuthorStickies extends EventHandler {
  name: "SEND_AUTHOR_STICKIES"
  handler: (stickies: StickyNote[]) => void
}

export interface SpotlightSpecificSticky extends EventHandler {
  name: "SPOTLIGHT_SPECIFIC_STICKY"
  handler: (id: string) => void
}

export type StickyNote = {
  id: string;
  author: string;
  color: Color;
  text: string;
};

export type Path = {
  page: string;
  params: string | null;
};

export type Color = {
  r: number;
  g: number;
  b: number;
};
