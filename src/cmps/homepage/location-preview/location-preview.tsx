import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { RootState } from '@/store/store'

import { aweatherService } from '@/services/aweather.service'
import { SelectedCity } from '@/models/selected-city'
import { LocationForecast } from '@/models/location-forecast'

import { FavoriteIndicator } from './favorite-indicator/favorite-indicator'
import { ForecastList } from '@/cmps/homepage/forecast/forcast-list'
import './style.scss'


export function LocationPreview() {
    const selectedCity: SelectedCity = useSelector((state: RootState) => state.weatherModule.selectedCity)
    const [forecast, setForecast] = useState<LocationForecast>()


    const fetchData = async (id: string) => {
        try {
            const forecast = await aweatherService.getLocationForecast(id)
            setForecast(forecast)
        } catch (err) {
        }
    }

    useEffect(() => {
        fetchData(selectedCity.id)
    }, [selectedCity])


    return (
        <div className="homepage--location-preview__container">
            <section className="info">
                <div className="status">
                    <span className="weather-image">
                        <img src="https://developer.accuweather.com/sites/default/files/07-s.png" />
                    </span>

                    <div className="location">
                        <div className="name">
                            <span className="city">{selectedCity.name}</span>
                            <span className="country">
                                {selectedCity.country.name}
                                <img src={`https://flagcdn.com/h20/${selectedCity.country.code.toLowerCase()}.jpg`} />
                            </span>
                        </div>

                        <div className="temp">Currently °35</div>

                        <div className="describe">Cloudy</div>
                    </div>
                </div>

                <div className="options">
                    <FavoriteIndicator initialState={false} />
                </div>
            </section>

            {forecast && <ForecastList forecast={forecast} />}
        </div>
    )
}