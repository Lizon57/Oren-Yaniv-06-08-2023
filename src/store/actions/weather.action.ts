import isEqual from 'lodash/isEqual'
import { store } from "../store"
import { aweatherService } from "@/services/aweather.service"
import { getErrorMessage } from '@/services/util/get-error-message'
import { eventBus } from '@/services/event.bus.service'
import { Location } from "@/models/location/location"
import { CurrWeather } from '@/models/curr-weather'
import { LocationForecast } from '@/models/forecast/location-forecast'
import { INITIAL_SELECTED_CITY } from "@/constants/initial-selected-city"


export const setSelectedCity = (city?: Location) => {
    if (!city) return

    const currSelectedCity = store.getState().weatherModule.selectedCity
    const isEqualCurrSelected = isEqual(currSelectedCity, city)
    if (isEqualCurrSelected) return

    store.dispatch({ type: 'setSelectedCity', city })
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


export const setInitialSelectedCity = () => {
    navigator.geolocation.getCurrentPosition(onSuccessGetUserGeo, onFailGetUserGeo)

    async function onSuccessGetUserGeo(geo: GeolocationPosition) {
        const userCoord = {
            lat: geo.coords.latitude.toFixed(3),
            lon: geo.coords.longitude.toFixed(3)
        }

        try {
            const location = await aweatherService.getLocationByLatLon(userCoord.lat, userCoord.lon)
            setSelectedCity(location)
        } catch (error) {
            setSelectedCity(INITIAL_SELECTED_CITY)
            const errorMessage = getErrorMessage(error)
            eventBus.emit('popErrorMessage', errorMessage)
        }
    }


    function onFailGetUserGeo() {
        setSelectedCity(INITIAL_SELECTED_CITY)
    }
}