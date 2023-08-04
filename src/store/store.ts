import { legacy_createStore as createStore, combineReducers } from 'redux'
import { weatherReducer } from './reducers/weather.reducer'
import { appReducer } from './reducers/app.reducer'
// import { legacy_createStore as createStore, compose, combineReducers } from 'redux'



const rootReducer = combineReducers({
    appModule: appReducer,
    weatherModule: weatherReducer,
})




export const store = createStore(rootReducer)
export type RootState = ReturnType<typeof store.getState>


// for Debug: Enable redux devtools
// const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// export const store = createStore(rootReducer, middleware())

// declare global {
//     interface Window {
//         __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
//     }
// }