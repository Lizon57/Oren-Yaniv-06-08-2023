import { store } from "../store"
import { aweatherService } from "@/services/aweather.service"
import { SelectedCity } from "@/models/selected-city"
import { INITIAL_SELECTED_CITY } from "@/constants/initial-selected-city"


export const setSelectedCity = (city?: SelectedCity) => {
    if (!city) return
    store.dispatch({ type: 'setSelectedCity', city })
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
        } catch (err) {
            console.log(err)
        }
    }
    
    
    function onFailGetUserGeo(){
        setSelectedCity(INITIAL_SELECTED_CITY)
    }
}