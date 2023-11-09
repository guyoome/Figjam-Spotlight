import {
    Bold,
    Text,
    IconArrowDown16,
    IconArrowUp16
} from "@create-figma-plugin/ui";

import { h } from "preact";

import styles from "../styles.css";

interface Props {
    isSortASC: Boolean,
    onClick: () => void
};

const Header = ({ isSortASC, onClick }: Props) => {
    return (
        <div class={styles.header}>
            <Text>
                <Bold>Author</Bold>
            </Text>

            <div class={styles.sort} onClick={() => { onClick() }}>
                <Text>
                    <Bold >Count</Bold>
                </Text>
                {
                    isSortASC ?
                        <IconArrowDown16 /> :
                        <IconArrowUp16 />
                }
            </div>
        </div>
    )
};

export default Header;