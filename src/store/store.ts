import { legacy_createStore as createStore, combineReducers } from 'redux'
import { weatherReducer } from './reducers/weather.reducer'
import { appReducer } from './reducers/app.reducer'
// For debug: uncomment to import Redux devtools
// import { legacy_createStore as createStore, compose, combineReducers } from 'redux'



const rootReducer = combineReducers({
    appModule: appReducer,
    weatherModule: weatherReducer,
})



// For debug: comment in store var without middleware and than commen in store var with middleware
// to implement Redux debtools
export const store = createStore(rootReducer)
export type RootState = ReturnType<typeof store.getState>


// For debug: comment in to Implement Redux devtools
// const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// export const store = createStore(rootReducer, middleware())

// declare global {
//     interface Window {
//         __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
//     }
// }