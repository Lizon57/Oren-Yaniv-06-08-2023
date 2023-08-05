import { useEffect } from "react"
import { useDebouncedCallback } from "use-debounce"


export const useOnWindowResize = (cb: () => void) => {
    const handleResize = () => cb()
    const debouncedHandleResize = useDebouncedCallback(handleResize, 100)

    useEffect(() => {
        window.addEventListener('resize', debouncedHandleResize)

        return () => window.removeEventListener('resize', debouncedHandleResize);
    }, [debouncedHandleResize])


    return
}