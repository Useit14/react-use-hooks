import {useLayoutEffect, useState} from "react";

const useReactResponsive = (properties) => {
    const [math, setMatch] = useState(window.matchMedia(properties.query).matches)
    let medias = window.matchMedia(properties.query)

    const onChangeMedia = () => {
        setMatch(medias.matches)
    }

    useLayoutEffect(() => {
        medias.addEventListener('change', onChangeMedia)
        return () => {
            medias.removeEventListener('change', onChangeMedia)
        }
    })

    return {
        math
    }
}

export default useReactResponsive