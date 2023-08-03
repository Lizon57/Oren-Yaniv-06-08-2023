import { INITIAL_SELECTED_CITY } from "@/constants/initial-selected-city"

export const getInitialSelectedCity = async () => {
    let initialCity = INITIAL_SELECTED_CITY
    try {
        // navigator.geolocation.getCurrentPosition(onSuccessGetUserGeo)
        console.log('in initial try')
    } catch (err) {
        console.log('fail initial')
    }

    return initialCity

    // function onSuccessGetUserGeo(geo: GeolocationPosition) {
    // return initialCity
    // console.log('hi')
    // const userCoord = {
    //     lat: geo.coords.latitude,
    //     lon: geo.coords.longitude
    // }
    // }
    // return initialCity
}

