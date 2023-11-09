import {
  once,
  showUI,
  emit,
  on
} from "@create-figma-plugin/utilities";

import {
  GetAllStickies,
  SendAllStickies,
  GetAuthorStickies,
  StickyNote,
  SendAuthorStickies,
  SpotlightSpecificSticky
} from "./types";

export default () => {

  on<SpotlightSpecificSticky>("SPOTLIGHT_SPECIFIC_STICKY", (id) => {
    const stickyNode = figma.currentPage.findChildren(n => n.id === id);
    figma.viewport.scrollAndZoomIntoView(stickyNode);
  });

  on<GetAuthorStickies>("GET_AUTHOR_STICKIES", (author) => {
    const stickyNodes: StickyNode[] = figma.currentPage.findAllWithCriteria({
      types: ["STICKY"]
    });

    const stickyNodesOfAuthor: StickyNode[] = [];
    const stickiesOfAuthor: StickyNote[] = [];
    stickyNodes.forEach(sticky => {
      if (sticky.authorName === author) {
        stickyNodesOfAuthor.push(sticky);

        const fillsRaw = JSON.stringify(sticky.fills);
        const fills = JSON.parse(fillsRaw.slice(1, -1));

        stickiesOfAuthor.push({
          author,
          id: sticky.id,
          color: fills.color,
          text: sticky.name
        });
      }
    });

    figma.currentPage.selection = stickyNodesOfAuthor;
    figma.viewport.scrollAndZoomIntoView(stickyNodesOfAuthor);

    emit<SendAuthorStickies>("SEND_AUTHOR_STICKIES", stickiesOfAuthor);
  });

  once<GetAllStickies>("GET_ALL_STICKIES", () => {
    const stickyNodes: StickyNode[] = figma.currentPage.findAllWithCriteria({
      types: ["STICKY"]
    });

    const stickiesByAuthor = new Map<string, Array<StickyNode>>();

    stickyNodes.forEach(stickyNode => {
      stickiesByAuthor.set(stickyNode["authorName"], [...stickiesByAuthor.get(stickyNode["authorName"]) || [], stickyNode]);
    });

    figma.viewport.scrollAndZoomIntoView(stickyNodes);

    emit<SendAllStickies>("SEND_ALL_STICKIES", [...stickiesByAuthor.entries()]);
  })

  showUI({
    height: 384,
    width: 256
  });
}
