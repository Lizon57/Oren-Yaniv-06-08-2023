import uuid from "react-uuid"

import { LocationForecast } from '@/models/location-forecast'

import { ForecastPreview } from './forecast-preview'
import './style.scss'


export function ForecastList({ forecast }: Props) {
    return (
        <section className="homepage--forecast-list__container">
            <h2>5 days forecast</h2>

            <div className="list">
                {forecast.forecasts.map((dailyForecast, idx) => <ForecastPreview
                    key={uuid()}
                    forecast={dailyForecast}
                    shouldRenderIcon={idx ? false : true}
                />)}
            </div>
        </section>
    )
}


type Props = {
    forecast: LocationForecast
}