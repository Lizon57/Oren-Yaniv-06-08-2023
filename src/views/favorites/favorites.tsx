import { useEffect, useState } from 'react'

import { favoriteService } from '@/services/favorite.service'
import { aweatherService } from '@/services/aweather.service'
import { getErrorMessage } from '@/services/util/get-error-message'

import { Location } from '@/models/location/location'
import { LocationWithCurrWeather } from '@/models/location/location-with-curr-weather'

import { Loader } from '@/cmps/common/loader/loader'
import { ErrorMessage } from '@/cmps/common/error-message/error-message'
import { Icon } from '@/cmps/common/icon/icon'
import { FavoritesList } from '@/cmps/favorites/favorites-list/favorites-list'
import './style.scss'
import { eventBus } from '@/services/event.bus.service'


export default function Favorites() {
    const [favoritesWithCurrWeather, setFavoritesWithCurrWeather] = useState<LocationWithCurrWeather[]>()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string>()


    const getFavoritesFromStorage = () => {
        return favoriteService.getFavorites() as Location[]
    }


    const fetchData = async (favoriteLocations: Location[]) => {
        try {
            const favoritesPromises = favoriteLocations.map(location => aweatherService.getLocationCurrWeather(location.id))
            const favoritesCurrWeather = await Promise.all(favoritesPromises)

            const mergedFavorites: LocationWithCurrWeather[] = favoriteLocations.map((location, idx) => ({
                ...location,
                ...favoritesCurrWeather[idx]
            }))

            setFavoritesWithCurrWeather(mergedFavorites)
        } catch (err) {
            const errorMessage = getErrorMessage(err)
            setError(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }


    const loadFavoritesWithCurrWeather = () => {
        const favoriteLocations = getFavoritesFromStorage()

        if (!favoriteLocations.length) {
            setError('At present, there are no locations stored in the favorites list... yet.')
            setIsLoading(false)
            return
        }

        fetchData(favoriteLocations)
    }

    useEffect(() => {
        const unsubscribeReloadFavorites = eventBus.on('reloadFavoritesList', () => {
            loadFavoritesWithCurrWeather()
        })

        loadFavoritesWithCurrWeather()

        return () => unsubscribeReloadFavorites()
    }, [])


    if (isLoading) return <Loader />
    if (error) return <ErrorMessage message={error} />

    return (
        <main className="views--favorites__container">
            <h2>
                <Icon name="heart-full" />
                Favorites locations
            </h2>

            {favoritesWithCurrWeather && <FavoritesList locations={favoritesWithCurrWeather} />}
        </main>
    )
}