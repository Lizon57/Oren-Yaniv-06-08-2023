import { localStorageService } from "./localstorage.service"
import { Location } from "@/models/location/location"


const toggleFavorite = (location: Location) => {
    const favorites: Location[] = localStorageService.read('favorites') || []
    const idx = favorites.findIndex(favorite => favorite.id === location.id)

    if (idx === -1) favorites.push(location)
    else favorites.splice(idx, 1)

    localStorageService.save('favorites', favorites)
}


const getIsFavoriteLocation = (id: string) => {
    const favorites: Location[] = localStorageService.read('favorites') || []
    const idx = favorites.findIndex(favorite => favorite.id === id)

    if (idx === -1) return false
    return true
}


const getFavorites = () => {
    return localStorageService.read('favorites') || []
}


export const favoriteService = {
    toggleFavorite,
    getIsFavoriteLocation,
    getFavorites
}