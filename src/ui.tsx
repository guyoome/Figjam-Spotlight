import {
  render,
} from "@create-figma-plugin/ui";
import { emit, once } from "@create-figma-plugin/utilities";
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";

import {
  GetAllStickies,
  SendAllStickies,
  Path
} from "./types";

import Home from "./pages/Home";
import Author from "./pages/Author";

const EMOJI = ["🧔", "👩", "👩‍🦰", "🎅", "👳‍♂️", "👮‍♂️", "💂‍♀️", "🧜‍♀️", "🧙‍♂️", "🧛‍♀️", "🧟‍♂️", "🧚‍♀️", "👩‍💻", "👨‍🚀"];

const Plugin = () => {
  const [stickiesByAuthor, setStickiesByAuthor] = useState<[string, StickyNode[], string][]>([]);
  const [path, setPath] = useState<Path>({ page: "HOME", params: null });

  useEffect(() => {
    emit<GetAllStickies>("GET_ALL_STICKIES");
  }, []);

  once<SendAllStickies>("SEND_ALL_STICKIES", (data) => {
    const dataWithEmoji: [string, StickyNode[], string][] = [];
    data.forEach((element, index) => {
      const emoji = EMOJI[index] || "👤";
      dataWithEmoji.push([...element, emoji]);
    });

    setStickiesByAuthor(dataWithEmoji);
  });

  const handleNavigate = (path: Path) => {
    setPath(path);
  };

  return (
    <div>
      {path.page === "HOME" &&
        <Home stickiesByAuthor={stickiesByAuthor} navigate={(path: Path) => { handleNavigate(path) }} />
      }
      {path.page === "AUTHOR" &&
        <Author stickiesByAuthor={stickiesByAuthor} params={path.params} navigate={(path: Path) => { handleNavigate(path) }} />
      }
    </div>
  )
}

export default render(Plugin);
