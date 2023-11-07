import {
    Bold,
    Text,
    IconChevronLeft32,
    Inline
} from '@create-figma-plugin/ui'

import { h } from 'preact'

import styles from '../styles.css';

function Nav({ author, count, emoji, onClick }: { author: string, count: number, emoji: string, onClick: () => void }) {
    return (
        <div class={styles.nav}>
            <Inline space="extraSmall" style={{ display: "flex", alignItems: "center" }}>
                <div class={styles.backButton} onClick={() => onClick()}>
                    <IconChevronLeft32 />
                </div>
                <Text align="center">
                    <Bold><span class={styles.emoji}>{emoji}</span>{author}</Bold>
                </Text>
            </Inline>
            <Text align="center">
                <Bold>{count}</Bold>
            </Text>
        </div>
    )
}

export default Nav;