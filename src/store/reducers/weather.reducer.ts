import { ReduxAction } from "@/models/redux-action"
import { SelectedCity } from "@/models/selected-city"


const initialState: WeatherReducer = {
    selectedCity: undefined
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

