import { Line } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip } from 'chart.js'

import { useSelector } from "react-redux"
import { RootState } from "@/store/store"

import { LocationForecast } from "@/models/forecast/location-forecast"
import { convertTemperatureUnit } from "@/services/util/convert-temperatur-unit"
import './style.scss'


export function ForecastChart() {
    const isCelsiusPreffer = useSelector((state: RootState) => state.appModule.isCelsiusPreffer)
    const forecast: LocationForecast = useSelector((state: RootState) => state.weatherModule.fiveDayForecast)

    const getData = () => {
        return forecast.forecasts.map(forecast => isCelsiusPreffer
            ? (forecast.temperature.minimum + forecast.temperature.maximum) / 2
            : (convertTemperatureUnit(forecast.temperature.minimum)
                + convertTemperatureUnit(forecast.temperature.maximum)) / 2
        )
    }

    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip)

    const options = {
        responsive: true,
        tension: 0.2,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    drawBorder: false,
                    display: false,
                },
            },
            y: {
                grid: {
                    drawBorder: false,
                    display: false,
                },
                ticks: {
                    stepSize: 1
                }
            }
        },
    }

    const data = {
        labels: forecast.forecasts.map(forecast => forecast.dayName),
        datasets: [{
            data: getData(),
            borderColor: '#ff9f00',
        }]
    }


    return (
        <section className="homepage--forecast-chart__container">
            <h3>Average temperature chart</h3>

            <Line options={options} data={data} />
        </section>
    )
}