import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import { RootState } from '@/store/store'
import { setCurrWeather, setFiveDayForecast } from '@/store/actions/weather.action'

import { aweatherService } from '@/services/aweather.service'

import { SelectedCity } from '@/models/selected-city'
import { CurrWeather } from '@/models/curr-weather'

import { FavoriteIndicator } from './favorite-indicator/favorite-indicator'
import { ForecastList } from '@/cmps/homepage/forecast/forcast-list'
import { CurrWeatherPreview } from './curr-weather-preview/curr-weather-preview'
import './style.scss'
import { CelsiusFahrenheitToggler } from '@/cmps/layout/app-header/celsius-fahrenheit-toggler/celsius-fahrenheit-toggler'


export function LocationPreview() {
    const selectedCity: SelectedCity = useSelector((state: RootState) => state.weatherModule.selectedCity)
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

    return (
        <div className="homepage--location-preview__container">
            <section className="info">
                <CurrWeatherPreview />

                <div className="options">
                    <FavoriteIndicator initialState={false} />
                    <CelsiusFahrenheitToggler />
                </div>
            </section>

            <ForecastList />
        </div>
    )
}