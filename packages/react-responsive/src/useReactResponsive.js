import {useLayoutEffect, useState} from "react";

const useReactResponsive = (properties) => {
    const [math, setMatch] = useState(window.matchMedia(properties.query).matches)
    const standartSizesView = [576, 720, 960, 1140]
    let query = properties.query.substring(1, properties.query.length - 1)
    let [media, sizing] = query.split(':')
    sizing = parseInt(sizing)
    let medias

    const findClosestMedia = (media, sizing) => {
        const differences = []
        for (const element of standartSizesView) {
            differences.push(Math.abs(sizing - element))
        }
        return standartSizesView[differences.indexOf(Math.min.apply(null, differences))]
    }

    const isStandart = (sizing) => {
        for (const standartMedia of standartSizesView) {
            if (sizing == standartMedia) {
                return true
            }
        }
    }

    const onChangeMedia = () => {
        setMatch(medias.matches)
    }

    useLayoutEffect(() => {
        medias.addEventListener('change', onChangeMedia)
        return () => {
            medias.removeEventListener('change', onChangeMedia)
        }
    })

    if (media == 'max-width' || media == 'min-width') {
        if (isStandart(sizing)) {
            medias = window.matchMedia(properties.query)
        } else {
            medias = window.matchMedia(`(${media}: ${findClosestMedia(media, sizing)}px)`)
        }
    } else {
        medias = window.matchMedia(properties.query)
    }
    return {
        math
    }
}

export default useReactResponsive