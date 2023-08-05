import { INITIAL_SELECTED_LOCATION } from "@/constants/initial-selected-location"
import { CurrWeather } from "@/models/curr-weather"
import { LocationForecast } from "@/models/forecast/location-forecast"
import { ReduxAction } from "@/models/redux-action"
import { Location } from "@/models/location/location"


const initialState: WeatherReducer = {
    selectedLocation: INITIAL_SELECTED_LOCATION,
    currWeather: undefined,
    fiveDayForecast: undefined
}


export const weatherReducer = (state = initialState, action: ReduxAction) => {
    switch (action.type) {
        case 'setSelectedLocation':
            return { ...state, selectedLocation: action.location }

        case 'setCurrWeather':
            return { ...state, currWeather: action.currWeather }

        case 'setFiveDayForecast':
            return { ...state, fiveDayForecast: action.fiveDayForecast }

        default:
            return state
    }
}


type WeatherReducer = {
    selectedLocation: Location
    currWeather?: CurrWeather
    fiveDayForecast?: LocationForecast
}

