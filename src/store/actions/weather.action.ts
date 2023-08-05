import isEqual from 'lodash/isEqual'
import { store } from "../store"
import { aweatherService } from "@/services/aweather.service"
import { getErrorMessage } from '@/services/util/get-error-message'
import { eventBus } from '@/services/event.bus.service'
import { Location } from "@/models/location/location"
import { CurrWeather } from '@/models/curr-weather'
import { LocationForecast } from '@/models/forecast/location-forecast'
import { INITIAL_SELECTED_LOCATION } from "@/constants/initial-selected-location"


export const setSelectedLocation = (location?: Location) => {
    if (!location) return

    const currSelectedLocation = store.getState().weatherModule.selectedLocation
    const isEqualCurrSelected = isEqual(currSelectedLocation, location)
    if (isEqualCurrSelected) return

    store.dispatch({ type: 'setSelectedLocation', location })
}


export const setCurrWeather = (newWeather?: CurrWeather) => {
    if (!newWeather) return

    const currWeather = store.getState().weatherModule.currWeather
    const isEqualCurrWeather = isEqual(currWeather, newWeather)
    if (isEqualCurrWeather) return

    store.dispatch({ type: 'setCurrWeather', currWeather: newWeather })
}


export const setFiveDayForecast = (newForecast?: LocationForecast) => {
    if (!newForecast) return

    const currForecast = store.getState().weatherModule.fiveDayForecast
    const isEqualForecast = isEqual(currForecast, newForecast)
    if (isEqualForecast) return

    store.dispatch({ type: 'setFiveDayForecast', fiveDayForecast: newForecast })
}


export const setInitialSelectedLocation = () => {
    navigator.geolocation.getCurrentPosition(onSuccessGetUserGeo, onFailGetUserGeo)

    async function onSuccessGetUserGeo(geo: GeolocationPosition) {
        const userCoord = {
            lat: geo.coords.latitude.toFixed(3),
            lon: geo.coords.longitude.toFixed(3)
        }

        try {
            const location = await aweatherService.getLocationByLatLon(userCoord.lat, userCoord.lon)
            setSelectedLocation(location)
        } catch (error) {
            setSelectedLocation(INITIAL_SELECTED_LOCATION)
            const errorMessage = getErrorMessage(error)
            eventBus.emit('popErrorMessage', errorMessage)
        }
    }


    function onFailGetUserGeo() {
        setSelectedLocation(INITIAL_SELECTED_LOCATION)
    }
}