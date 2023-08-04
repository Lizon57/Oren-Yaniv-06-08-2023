import { ReduxAction } from "@/models/redux-action"


const initialState: AppReducer = {
    isCelsiusPreffer: true
}


export const appReducer = (state = initialState, action: ReduxAction) => {
    switch (action.type) {
        case 'setIsCelsiusPreffer':
            return { ...state, isCelsiusPreffer: action.isCelsiusPreffer }

        default:
            return state
    }
}


type AppReducer = {
    isCelsiusPreffer: boolean
}

