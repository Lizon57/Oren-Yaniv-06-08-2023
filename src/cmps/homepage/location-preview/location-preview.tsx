import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import { RootState } from '@/store/store'
import { setCurrWeather, setFiveDayForecast } from '@/store/actions/weather.action'

import { aweatherService } from '@/services/aweather.service'

import { Location } from '@/models/location/location'
import { CurrWeather } from '@/models/curr-weather'
import { LocationWithCurrWeather } from '@/models/location/location-with-curr-weather'

import { FavoriteIndicator } from './favorite-indicator/favorite-indicator'
import { ForecastList } from '@/cmps/homepage/forecast/forcast-list'
import { CelsiusFahrenheitToggler } from '@/cmps/common/celsius-fahrenheit-toggler/celsius-fahrenheit-toggler'
import { LocationCurrWeatherPreview } from '@/cmps/common/location-curr-weather-preview/location-curr-weather-preview'
import './style.scss'


export function LocationPreview() {
    const selectedCity: Location = useSelector((state: RootState) => state.weatherModule.selectedCity)
    const currWeather: CurrWeather = useSelector((state: RootState) => state.weatherModule.currWeather)


    const fetchData = async (id: string) => {
        try {
            const forecast = await aweatherService.getLocationForecast(id)
            const currWeather = await aweatherService.getLocationCurrWeather(id)
            setFiveDayForecast(forecast)
            setCurrWeather(currWeather)
        } catch (err) {
        }
    }

    useEffect(() => {
        fetchData(selectedCity.id)
    }, [selectedCity])


    if (!currWeather) return <></>

    const locationWithWeather: LocationWithCurrWeather = { ...selectedCity, ...currWeather }

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