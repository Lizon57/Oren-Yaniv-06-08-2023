const apikey: string = import.meta.env.VITE_APP_AWEATHER_API_KEY as string
import { AWEATHER_BASE_URL } from '@/constants/aweather-base-url'
import { localStorageService } from './localstorage.service'
import { httpService } from './http.service'


// For debug: have response for "tel" search
const response = [
    {
        "Version": 1,
        "Key": "215793",
        "Type": "City",
        "Rank": 95,
        "LocalizedName": "Tel-aviv Port",
        "Country": {
            "ID": "IL",
            "LocalizedName": "Israel"
        },
        "AdministrativeArea": {
            "ID": "TA",
            "LocalizedName": "Tel Aviv"
        }
    },
    {
        "Version": 1,
        "Key": "209001",
        "Type": "City",
        "Rank": 95,
        "LocalizedName": "Tel Arza",
        "Country": {
            "ID": "IL",
            "LocalizedName": "Israel"
        },
        "AdministrativeArea": {
            "ID": "JM",
            "LocalizedName": "Jerusalem"
        }
    }
]


const getAutocompleteOptions = async (pharse: string) => {
    const { [pharse]: history } = localStorageService.read('autocomplete') || { [pharse]: null }
    if (history) return history

    try {
        // const url = `${AWEATHER_BASE_URL}locations/v1/cities/autocomplete?q=${pharse}`
        // const response = await httpService.get(url, { apikey })
        localStorageService.addToMap('autocomplete', pharse, response)
        return response
    } catch (err) {
        throw err
    }
}



export const aweatherService = {
    getAutocompleteOptions
}