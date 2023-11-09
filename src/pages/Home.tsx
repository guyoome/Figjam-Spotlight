import { h } from "preact";
import { useState } from "preact/hooks";

import { Path } from "../types";

import styles from "../styles.css";
import Item from "../components/Item";
import Header from "../components/Header";

interface Props {
    stickiesByAuthor: [string, StickyNode[], string][],
    navigate: (path: Path) => void
};

const Home = ({ stickiesByAuthor, navigate }: Props) => {
    const [isSortASC, setIsSortASC] = useState<Boolean>(false);

    return (
        <div>
            <Header isSortASC={isSortASC} onClick={() => { setIsSortASC(current => !current) }} />

            <div class={styles.list}>
                {stickiesByAuthor
                    .sort((a, b) => {
                        return isSortASC ?
                            a[1].length - b[1].length
                            :
                            b[1].length - a[1].length
                    })
                    .map((value, key) => {
                        const author = value[0];
                        const stickies = value[1];
                        const emoji = value[2];
                        return (
                            <Item
                                key={`item-${key}`}
                                author={author}
                                count={stickies.length}
                                emoji={emoji}
                                onClick={() => { navigate({ page: "AUTHOR", params: author }) }}
                            />
                        )
                    })}
            </div>
        </div>
    )
}

export default Home;