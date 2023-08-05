const apikey: string = import.meta.env.VITE_APP_AWEATHER_API_KEY as string

import { httpService } from './http.service'
import { localStorageService } from './localstorage.service'

import { LocationByLatLonResponse } from '@/models/aweather-resopnses/location-by-lat-lon-response'
import { LocationForecastResponse } from '@/models/aweather-resopnses/location-forecast-response'
import { CurrWeatherResponse } from '@/models/aweather-resopnses/curr-weather-response'

import { AWEATHER_BASE_URL } from '@/constants/aweather-base-url'

import { convertTemperatureUnit } from './util/convert-temperatur-unit'
import { convertDateToDayName } from './util/convert-date-to-day-name'


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

    // const { [pharse]: history } = localStorageService.read('autocomplete') || { [pharse]: null }
    // if (history) return history

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
    const response: LocationByLatLonResponse = {
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

        const responseToSave = _formatLocationByLatLonResponse(response)

        // localStorageService.saveToMap('locationByLatLon', latLon, responseToSave)
        return responseToSave
    } catch (err) {
        throw new Error('An error occured while trying to find you\'re location. Please try again')
    }
}


const getLocationForecast = async (id: string) => {
    // For debug: have 6 days forecast response for Tel-Aviv according to 04/08/2023
    const response: LocationForecastResponse = {
        "Headline": {
            "EffectiveDate": "2023-08-04T20:00:00+03:00",
            "EffectiveEpochDate": 1691168400,
            "Severity": 7,
            "Text": "Warm Friday night",
            "Category": "heat",
            "EndDate": "2023-08-05T08:00:00+03:00",
            "EndEpochDate": 1691211600,
            "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?lang=en-us",
            "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?lang=en-us"
        },
        "DailyForecasts": [
            {
                "Date": "2023-08-04T07:00:00+03:00",
                "EpochDate": 1691121600,
                "Temperature": {
                    "Minimum": {
                        "Value": 80,
                        "Unit": "F",
                        "UnitType": 18
                    },
                    "Maximum": {
                        "Value": 91,
                        "Unit": "F",
                        "UnitType": 18
                    }
                },
                "Day": {
                    "Icon": 1,
                    "IconPhrase": "Sunny",
                    "HasPrecipitation": false
                },
                "Night": {
                    "Icon": 34,
                    "IconPhrase": "Mostly clear",
                    "HasPrecipitation": false
                },
                "Sources": [
                    "AccuWeather"
                ],
                "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us",
                "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us"
            },
            {
                "Date": "2023-08-05T07:00:00+03:00",
                "EpochDate": 1691208000,
                "Temperature": {
                    "Minimum": {
                        "Value": 78,
                        "Unit": "F",
                        "UnitType": 18
                    },
                    "Maximum": {
                        "Value": 90,
                        "Unit": "F",
                        "UnitType": 18
                    }
                },
                "Day": {
                    "Icon": 2,
                    "IconPhrase": "Mostly sunny",
                    "HasPrecipitation": false
                },
                "Night": {
                    "Icon": 34,
                    "IconPhrase": "Mostly clear",
                    "HasPrecipitation": false
                },
                "Sources": [
                    "AccuWeather"
                ],
                "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us",
                "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us"
            },
            {
                "Date": "2023-08-06T07:00:00+03:00",
                "EpochDate": 1691294400,
                "Temperature": {
                    "Minimum": {
                        "Value": 78,
                        "Unit": "F",
                        "UnitType": 18
                    },
                    "Maximum": {
                        "Value": 92,
                        "Unit": "F",
                        "UnitType": 18
                    }
                },
                "Day": {
                    "Icon": 1,
                    "IconPhrase": "Sunny",
                    "HasPrecipitation": false
                },
                "Night": {
                    "Icon": 34,
                    "IconPhrase": "Mostly clear",
                    "HasPrecipitation": false
                },
                "Sources": [
                    "AccuWeather"
                ],
                "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us",
                "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us"
            },
            {
                "Date": "2023-08-07T07:00:00+03:00",
                "EpochDate": 1691380800,
                "Temperature": {
                    "Minimum": {
                        "Value": 80,
                        "Unit": "F",
                        "UnitType": 18
                    },
                    "Maximum": {
                        "Value": 90,
                        "Unit": "F",
                        "UnitType": 18
                    }
                },
                "Day": {
                    "Icon": 1,
                    "IconPhrase": "Sunny",
                    "HasPrecipitation": false
                },
                "Night": {
                    "Icon": 35,
                    "IconPhrase": "Partly cloudy",
                    "HasPrecipitation": false
                },
                "Sources": [
                    "AccuWeather"
                ],
                "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us",
                "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us"
            },
            {
                "Date": "2023-08-08T07:00:00+03:00",
                "EpochDate": 1691467200,
                "Temperature": {
                    "Minimum": {
                        "Value": 79,
                        "Unit": "F",
                        "UnitType": 18
                    },
                    "Maximum": {
                        "Value": 90,
                        "Unit": "F",
                        "UnitType": 18
                    }
                },
                "Day": {
                    "Icon": 1,
                    "IconPhrase": "Sunny",
                    "HasPrecipitation": false
                },
                "Night": {
                    "Icon": 34,
                    "IconPhrase": "Mostly clear",
                    "HasPrecipitation": false
                },
                "Sources": [
                    "AccuWeather"
                ],
                "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&lang=en-us",
                "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&lang=en-us"
            }
        ]
    }

    // const { [id]: history } = localStorageService.read('forecasts') || { [id]: null }
    // const fiveHourInMillisecond = 1000 * 60 * 60 * 5
    // if ((new Date(history?.effectiveDate).getTime() || Infinity) < Date.now() + fiveHourInMillisecond) return history

    try {
        // const url = `${AWEATHER_BASE_URL}forecasts/v1/daily/5day/${id}`
        // const response = await httpService.get(url, { apikey })

        const responseToSave = _formatLocationForecast(response)

        localStorageService.saveToMap('forecastsById', id, responseToSave)

        return responseToSave
    } catch (err) {
        throw new Error('An error occured while trying to get forecast for you. Please try again.')
    }
}


const getLocationCurrWeather = async (id: string) => {
    const response: CurrWeatherResponse = [
        {
            "LocalObservationDateTime": "2023-08-05T15:42:00+03:00",
            "EpochTime": 1691239320,
            "WeatherText": "Sunny",
            "WeatherIcon": 1,
            "HasPrecipitation": false,
            "PrecipitationType": null,
            "IsDayTime": true,
            "Temperature": {
                "Metric": {
                    "Value": 30.7,
                    "Unit": "C",
                    "UnitType": 17
                },
                "Imperial": {
                    "Value": 87,
                    "Unit": "F",
                    "UnitType": 18
                }
            },
            "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
            "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us"
        }
    ]

    const { [id]: history } = localStorageService.read('currWeather') || { [id]: null }
    const oneHourInMillisecond = 1000 * 60 * 60
    if ((new Date(history?.effectiveDate).getTime() || Infinity) < Date.now() + oneHourInMillisecond) return history

    try {
        // const url = `${AWEATHER_BASE_URL}currentconditions/v1//${id}`
        // const response = await httpService.get(url, { apikey })

        const responseToSave = _formatLocationCurrWeather(response)

        localStorageService.saveToMap('currWeather', id, responseToSave)
        return responseToSave
    } catch (err) {
        throw new Error('An error occured while trying to get forecast for you. Please try again.')
    }
}


export const aweatherService = {
    getAutocompleteOptions,
    getLocationByLatLon,
    getLocationForecast,
    getLocationCurrWeather
}



const _formatLocationByLatLonResponse = (response: LocationByLatLonResponse) => ({
    id: response.Key,
    name: response.LocalizedName,
    country: {
        code: response.Country.ID.toLocaleLowerCase(),
        name: response.Country.LocalizedName
    }
})


const _formatLocationForecast = (response: LocationForecastResponse) => ({
    effectiveDate: new Date(response.Headline.EffectiveDate).getTime(),
    forecasts: response.DailyForecasts.map((forecast) => ({
        dayName: convertDateToDayName(new Date(forecast.Date)),
        day: {
            icon: String(forecast.Day.Icon).padStart(2, '0'),
            text: forecast.Day.IconPhrase
        },
        night: {
            icon: String(forecast.Night.Icon).padStart(2, '0'),
            text: forecast.Night.IconPhrase
        },
        temperature: {
            minimum: +convertTemperatureUnit(forecast.Temperature.Minimum.Value, true).toFixed(0),
            maximum: +convertTemperatureUnit(forecast.Temperature.Maximum.Value, true).toFixed(0),
        }
    }))
})


const _formatLocationCurrWeather = (response: CurrWeatherResponse) => {
    const unwindResponse = response[0]

    const formattedResponse = {
        effectiveDate: new Date(unwindResponse.LocalObservationDateTime).getTime(),
        weather: {
            icon: String(unwindResponse.WeatherIcon).padStart(2, '0'),
            text: unwindResponse.WeatherText,
            celsiusTemp: +convertTemperatureUnit(unwindResponse.Temperature.Imperial.Value, true).toFixed(0)
        },
    }

    return formattedResponse
}