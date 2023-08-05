import { INITIAL_SELECTED_CITY } from "@/constants/initial-selected-city"
import { CurrWeather } from "@/models/curr-weather"
import { LocationForecast } from "@/models/forecast/location-forecast"
import { ReduxAction } from "@/models/redux-action"
import { SelectedCity } from "@/models/selected-city"


const initialState: WeatherReducer = {
    selectedCity: INITIAL_SELECTED_CITY,
    currWeather: undefined,
    fiveDayForecast: undefined
}


export const weatherReducer = (state = initialState, action: ReduxAction) => {
    switch (action.type) {
        case 'setSelectedCity':
            return { ...state, selectedCity: action.city }

        case 'setCurrWeather':
            return { ...state, currWeather: action.currWeather }

        case 'setFiveDayForecast':
            return { ...state, fiveDayForecast: action.fiveDayForecast }

        default:
            return state
    }
}


type WeatherReducer = {
    selectedCity?: SelectedCity
    currWeather?: CurrWeather
    fiveDayForecast?: LocationForecast
}

