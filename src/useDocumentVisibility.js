import {useState} from "react";

const useDocumentVisibility = () => {
    const [count, setCount] = useState(0)
    const [visible, setVisible] = useState(true)

    const onVisibilityChange = () => {
        if(document.hidden){
            setVisible(false)
            setCount(count + 1)
        } else {
            setVisible(true)
        }
    }

    document.addEventListener('visibilitychange',onVisibilityChange)

    return {
        count,
        visible,
    }
}

export default useDocumentVisibility