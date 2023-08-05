import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

import { CurrWeather } from '@/models/curr-weather'
import { SelectedCity } from '@/models/selected-city'

import { Temperature } from '@/cmps/common/temperature/temperature'
import './style.scss'


export function CurrWeatherPreview() {
    const selectedCity: SelectedCity = useSelector((state: RootState) => state.weatherModule.selectedCity)
    const currWeather: CurrWeather = useSelector((state: RootState) => state.weatherModule.currWeather)

    return (
        <div className="homepage--curr-weather__container">
            <img src={`https://developer.accuweather.com/sites/default/files/${currWeather?.weather.icon}-s.png`} />

            <div className="location">
                <div className="name">
                    <span className="city">{selectedCity.name}</span>
                    <span className="country">
                        {selectedCity.country.name}
                        <img src={`https://flagcdn.com/h20/${selectedCity.country.code.toLowerCase()}.jpg`} />
                    </span>
                </div>

                <span className="temp">
                    <Temperature value={currWeather?.weather.celsiusTemp} shouldRenderIndicatorIcon />
                </span>

                <div className="describe">{currWeather?.weather.text}</div>
            </div>
        </div>
    )
}