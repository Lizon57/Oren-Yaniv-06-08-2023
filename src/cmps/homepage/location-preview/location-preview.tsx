import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { RootState } from '@/store/store'
import { setCurrWeather, setFiveDayForecast } from '@/store/actions/weather.action'

import { aweatherService } from '@/services/aweather.service'
import { getErrorMessage } from '@/services/util/get-error-message'

import { Location } from '@/models/location/location'
import { CurrWeather } from '@/models/curr-weather'
import { LocationWithCurrWeather } from '@/models/location/location-with-curr-weather'

import { FavoriteIndicator } from './favorite-indicator/favorite-indicator'
import { ForecastList } from '@/cmps/homepage/forecast/forecast-list/forcast-list'
import { CelsiusFahrenheitToggler } from '@/cmps/common/celsius-fahrenheit-toggler/celsius-fahrenheit-toggler'
import { LocationCurrWeatherPreview } from '@/cmps/common/location-curr-weather-preview/location-curr-weather-preview'
import { Loader } from '@/cmps/common/loader/loader'
import { ErrorMessage } from '@/cmps/common/error-message/error-message'
import './style.scss'


export function LocationPreview() {
    const selectedLocation: Location = useSelector((state: RootState) => state.weatherModule.selectedLocation)
    const currWeather: CurrWeather = useSelector((state: RootState) => state.weatherModule.currWeather)

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string>()


    const fetchData = async (id: string) => {
        try {
            const forecast = await aweatherService.getLocationForecast(id)
            const currWeather = await aweatherService.getLocationCurrWeather(id)
            setFiveDayForecast(forecast)
            setCurrWeather(currWeather)
        } catch (error) {
            const errorMessage = getErrorMessage(error)
            setError(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData(selectedLocation.id)
    }, [selectedLocation])


    if (isLoading) return <Loader />
    if (error) return <ErrorMessage message={error} />

    const locationWithWeather: LocationWithCurrWeather = { ...selectedLocation, ...currWeather }

    return (
        <div className="homepage--location-preview__container">
            <section className="info">
                <LocationCurrWeatherPreview location={locationWithWeather} />

                <div className="options">
                    <FavoriteIndicator />
                    <CelsiusFahrenheitToggler />
                </div>
            </section>

            <ForecastList />
        </div>
    )
}