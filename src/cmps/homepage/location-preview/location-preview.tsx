import { useSelector } from 'react-redux'

import { RootState } from '@/store/store'

import { SelectedCity } from '@/models/selected-city'

import './style.scss'
import { FavoriteIndicator } from './favorite-indicator/favorite-indicator'


export function LocationPreview() {
    const selectedCity: SelectedCity = useSelector((state: RootState) => state.weatherModule.selectedCity)


    return (
        <div className="homepage--location-preview__container">
            <div className="info">
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
            </div>

            <div className="forecasts">
                <h2>5 days forecasts</h2>
            </div>
        </div>
    )
}