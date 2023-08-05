import { useEffect, useState } from 'react'
import classNames from 'classnames'

import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

import { Location } from '@/models/location/location'

import { Icon } from '@/cmps/common/icon/icon'
import './style.scss'
import { favoriteService } from '@/services/favorite.service'


export function FavoriteIndicator() {
    const selectedLocation: Location = useSelector((state: RootState) => state.weatherModule.selectedLocation)
    const [isFavorite, setIsFavorite] = useState<boolean>()

    useEffect(() => {
        const isFavorite = favoriteService.getIsFavoriteLocation(selectedLocation.id)
        setIsFavorite(isFavorite)
    })

    const toggleIsFavorite = () => {
        favoriteService.toggleFavorite(selectedLocation)
        setIsFavorite(!isFavorite)
    }


    return (
        <button className="homepage--favorite-indicator__container" onClick={toggleIsFavorite}>
            <span className="indicator">{isFavorite ? 'Remove from' : 'Add to'} Favorites</span>
            <Icon
                name={isFavorite ? 'heart-full' : 'heart-outline'}
                classList={classNames({ favorite: isFavorite })}
                size="32"
                title={isFavorite ? 'Favorite' : 'Unfavorite'}
            />
        </button>
    )
}