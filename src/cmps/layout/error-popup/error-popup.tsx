import { useEffect, useState } from "react"
import { eventBus } from "@/services/event.bus.service"
import { Icon } from "@/cmps/common/icon/icon"
import './style.scss'


const delay = 3500

export function ErrorPopup() {
    const [error, setError] = useState<string>()

    useEffect(() => {
        const unsubscribeClearFilter = eventBus.on('popErrorMessage', (error) => {
            setError(error as string)

            setTimeout(() => setError(undefined), delay)
        })

        return () => unsubscribeClearFilter()
    }, [])


    if (!error) return <></>
    return (
        <aside className="layout--error-popup__container">
            <Icon name="sad-smiley" size="20px" />
            <span className="text">{error}</span>
        </aside>
    )
}