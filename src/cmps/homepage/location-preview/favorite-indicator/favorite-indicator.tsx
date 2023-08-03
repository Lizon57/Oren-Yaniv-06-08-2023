import { useState } from 'react'
import classNames from 'classnames'

import { Icon } from '@/cmps/common/icon/icon'
import './style.scss'


export function FavoriteIndicator({ initialState }: Props) {
    const [isFavorite, setIsFavorite] = useState(initialState)
    const toggleIsFavorite = () => setIsFavorite(!isFavorite)


    return (
        <button className="homepage--favorite-indicator__container" onClick={toggleIsFavorite}>
            <Icon
                name={isFavorite ? 'heart-full' : 'heart-outline'}
                classList={classNames({ favorite: isFavorite })}
                size="32"
                title={`${(isFavorite ? 'Favorite' : 'Unfavorite')}`}
            />
        </button>
    )
}


type Props = {
    initialState: boolean
}