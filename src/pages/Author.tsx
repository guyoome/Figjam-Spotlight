import {
    Bold,
    Text,
    VerticalSpace
} from '@create-figma-plugin/ui'
import { emit, on } from '@create-figma-plugin/utilities'
import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import { Path, GetAuthorStickies, SendAuthorStickies, StickyNote, Color, SpotlightSpecificSticky } from '../types'

import styles from '../styles.css';
import Nav from '../components/Nav';
import Header from '../components/Header';

function componentToHex(c: number) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r: number, g: number, b: number) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

const getColorHex = (color: Color) => {
    const r = Math.round(color.r * 255);
    const g = Math.round(color.g * 255);
    const b = Math.round(color.b * 255);
    console.log(r, g, b);

    console.log(rgbToHex(r, g, b));

    return rgbToHex(r, g, b);
}

function Author({ stickiesByAuthor, params, navigate }: { stickiesByAuthor: [string, StickyNode[], string][], params: string | null, navigate: (path: Path) => void }) {
    const [isSortASC, setIsSortASC] = useState<Boolean>(false);

    const [stickies, setStickies] = useState<StickyNote[]>([]);

    const data = stickiesByAuthor.find((el) => el[0] === params);
    if (data === undefined) {
        navigate({ page: "HOME", params: null });
        return (<div></div>)
    }
    const author = data[0];
    const emoji = data[2];

    useEffect(() => {
        emit<GetAuthorStickies>('GET_AUTHOR_STICKIES', author);
    }, [params])

    on<SendAuthorStickies>('SEND_AUTHOR_STICKIES', function (stickies) {
        setStickies(stickies);
    })

    const handleSpotlightSticky = (id: string) => {
        emit<SpotlightSpecificSticky>('SPOTLIGHT_SPECIFIC_STICKY', id);
    }

    return (
        <div>
            <Header isSortASC={isSortASC} onClick={() => { setIsSortASC(current => !current) }} />
            <Nav author={author} count={stickies.length} emoji={emoji} onClick={() => { navigate({ page: "HOME", params: null }) }} />
            <VerticalSpace space='small' />
            {stickies.map((sticky) => (
                <div key={`sticky-${sticky.id}`} class={styles.stickyContainer} onClick={() => { handleSpotlightSticky(sticky.id) }}>
                    <div
                        class={[styles.sticky, styles.stickyContainerItem].join(' ')}
                        style={{ backgroundColor: getColorHex(sticky.color) }}
                    >
                        <Text align="center">{sticky.text.substring(0, 25)}{sticky.text.substring(0, 25).length === 25 ? '...' : ''}</Text>
                    </div>
                    <Text >
                        <Bold>{sticky.text.substring(0, 60)}{sticky.text.substring(0, 60).length === 60 ? '...' : ''}</Bold>
                    </Text>
                </div>
            ))}
            <VerticalSpace space='small' />
        </div>
    )
}

export default Author;