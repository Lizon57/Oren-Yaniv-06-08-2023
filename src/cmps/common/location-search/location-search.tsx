import { ChangeEvent, useState, useEffect, useRef } from "react"
import { useDebouncedCallback } from "use-debounce"
import classNames from "classnames"
import { Icon } from "../icon/icon"
import './style.scss'


export function LocationSearch({ initialTerm }: Props) {
    const [term, setTerm] = useState(initialTerm || '')

    const elInput = useRef<HTMLInputElement>(null)


    const changeTermHandler = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => setTerm(value)
    const onClearTerm = () => {
        setTerm('')
        elInput.current?.focus()
    }


    const fetchSearch = () => {
        console.log('fetch')
    }
    const debouncedFetchSearch = useDebouncedCallback(fetchSearch, 500)
    useEffect(() => {
        debouncedFetchSearch()
    }, [fetchSearch])


    return (
        <div className="common--location-search__container" title="Search a location">
            <input
                type="text"
                value={term}
                className={classNames({ 'pristine': term })}
                ref={elInput}
                placeholder="Search for location"
                onChange={changeTermHandler}
            />
            <Icon name="location" classList="input-indicator" size="32" />
            <Icon name="times-circle" classList="clear" title="Clear search" size="20" onClick={onClearTerm} />
        </div>
    )
}


type Props = {
    initialTerm?: string
}