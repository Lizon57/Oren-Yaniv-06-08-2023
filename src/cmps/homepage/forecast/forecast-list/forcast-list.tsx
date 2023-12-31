import uuid from "react-uuid"

import { useSelector } from "react-redux"
import { RootState } from "@/store/store"

import { LocationForecast } from '@/models/forecast/location-forecast'

import { ForecastPreview } from '../forecast-preview/forecast-preview'
import { ForecastChart } from "../forecast-chart/forecast-chart"
import './style.scss'


export function ForecastList() {
    const forecast: LocationForecast = useSelector((state: RootState) => state.weatherModule.fiveDayForecast)


    if (!forecast) return <></>

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
            <ForecastChart />
        </section>
    )
}