const apikey: string = import.meta.env.VITE_APP_AWEATHER_API_KEY as string
import { AWEATHER_BASE_URL } from '@/constants/aweather-base-url'
import { localStorageService } from './localstorage.service'
import { httpService } from './http.service'


const getAutocompleteOptions = async (pharse: string) => {
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

    const { [pharse]: history } = localStorageService.read('autocomplete') || { [pharse]: null }
    if (history) return history

    try {
        // const url = `${AWEATHER_BASE_URL}locations/v1/cities/autocomplete?q=${pharse}`
        // const response = await httpService.get(url, { apikey })
        // localStorageService.addToMap('autocomplete', pharse, response)
        return response
    } catch (err) {
        throw err
    }
}


const getLocationByLatLon = async (lat: string, lon: string) => {
    // For debug: have response for Hadera lat, lon search
    const response = {
        "Version": 1,
        "Key": "213124",
        "Type": "City",
        "Rank": 45,
        "LocalizedName": "Hadera",
        "EnglishName": "Hadera",
        "PrimaryPostalCode": "",
        "Region": {
            "ID": "MEA",
            "LocalizedName": "Middle East",
            "EnglishName": "Middle East"
        },
        "Country": {
            "ID": "IL",
            "LocalizedName": "Israel",
            "EnglishName": "Israel"
        },
        "AdministrativeArea": {
            "ID": "HA",
            "LocalizedName": "Haifa",
            "EnglishName": "Haifa",
            "Level": 1,
            "LocalizedType": "District",
            "EnglishType": "District",
            "CountryID": "IL"
        },
        "TimeZone": {
            "Code": "IDT",
            "Name": "Asia/Jerusalem",
            "GmtOffset": 3,
            "IsDaylightSaving": true,
            "NextOffsetChange": "2023-10-28T23:00:00Z"
        },
        "GeoPosition": {
            "Latitude": 32.445,
            "Longitude": 34.915,
            "Elevation": {
                "Metric": {
                    "Value": 24,
                    "Unit": "m",
                    "UnitType": 5
                },
                "Imperial": {
                    "Value": 78,
                    "Unit": "ft",
                    "UnitType": 0
                }
            }
        },
        "IsAlias": false,
        "SupplementalAdminAreas": [],
        "DataSets": [
            "AirQualityCurrentConditions",
            "AirQualityForecasts",
            "Alerts",
            "DailyPollenForecast",
            "ForecastConfidence",
            "FutureRadar",
            "MinuteCast"
        ]
    }

    const latLon = lat + '|' + lon
    const { [latLon]: history } = localStorageService.read('locationByLatLon') || { [latLon]: null }
    if (history) return history

    try {
        // const url = `${AWEATHER_BASE_URL}locations/v1/cities/geoposition/search?q=${lat},${lon}`
        // const response = await httpService.get(url, { apikey })

        const responseToSave = {
            id: response.Key,
            name: response.LocalizedName,
            country: {
                code: response.Country.ID,
                name: response.Country.LocalizedName
            }
        }

        localStorageService.addToMap('locationByLatLon', latLon, responseToSave)
        return responseToSave
    } catch (err) {
        throw err
    }
}




export const aweatherService = {
    getAutocompleteOptions,
    getLocationByLatLon
}