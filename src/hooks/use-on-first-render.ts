import { useRef } from 'react'


export const useOnFirstRender = (callback: () => void) => {
    const isFirstRender = useRef(true)
    if (!isFirstRender.current) return

    isFirstRender.current = false
    callback()
}