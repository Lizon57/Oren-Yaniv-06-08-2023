import { INITIAL_SELECTED_CITY } from "@/constants/initial-selected-city"
import { ReduxAction } from "@/models/redux-action"
import { SelectedCity } from "@/models/selected-city"


const initialState: WeatherReducer = {
    selectedCity: INITIAL_SELECTED_CITY
}


export const weatherReducer = (state = initialState, action: ReduxAction) => {
    switch (action.type) {
        case 'setSelectedCity':
            return { ...state, selectedCity: action.city }

        default:
            return state
    }
}


type WeatherReducer = {
    selectedCity?: SelectedCity
}

