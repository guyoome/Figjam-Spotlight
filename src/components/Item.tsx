import {
    Bold,
    Text
} from '@create-figma-plugin/ui'

import { h } from 'preact'

import styles from '../styles.css';

function Item({ author, count, emoji, onClick }: { author: string, emoji: string, count: number, onClick: () => void }) {
    return (
        <div class={styles.item} onClick={() => onClick()}>
            <Text align="center">
                <Bold><span class={styles.emoji}>{emoji}</span>{author}</Bold>
            </Text>
            <Text align="center">
                <Bold>{count}</Bold>
            </Text>
        </div>
    )
}

export default Item;