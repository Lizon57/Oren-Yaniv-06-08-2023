import { LocationWithCurrWeather } from "@/models/location/location-with-curr-weather"

import { Temperature } from '@/cmps/common/temperature/temperature'
import './style.scss'


export function LocationCurrWeatherPreview({ location }: Props) {
    return (
        <article className="common--location-curr-weather-preview__container">
            <img src={`https://developer.accuweather.com/sites/default/files/${location.weather.icon}-s.png`} />

            <div className="location">
                <div className="name">
                    <span className="city">{location.name}</span>
                    <span className="country">
                        {location.country.name}
                        <img src={`https://flagcdn.com/h20/${location.country.code.toLowerCase()}.jpg`} />
                    </span>
                </div>

                <span className="temp">
                    <Temperature value={location.weather.celsiusTemp} shouldRenderIndicatorIcon />
                </span>

                <div className="describe">{location.weather.text}</div>
            </div>
        </article>
    )
}


type Props = {
    location: LocationWithCurrWeather
}