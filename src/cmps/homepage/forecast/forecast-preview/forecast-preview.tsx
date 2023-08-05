import { Forecast } from "@/models/forecast/forecast"

import { Icon } from "@/cmps/common/icon/icon"
import { Temperature } from "@/cmps/common/temperature/temperature"
import './style.scss'


export function ForecastPreview({ forecast, shouldRenderIcon }: Props) {
    return (
        <>
            <article className="homepage--forecast-preview__container">
                <span className="day-name">{forecast.dayName}</span>

                <img src={`https://developer.accuweather.com/sites/default/files/${forecast.day.icon}-s.png`} />

                <div className="textual">
                    <div className="day">
                        {shouldRenderIcon && <Icon name="sun-outline" size="20px" />}
                        {forecast.day.text}
                    </div>

                    <div className="night">
                        {shouldRenderIcon && <Icon name="moon-full" size="20px" />}
                        {forecast.night.text}
                    </div>
                </div>

                <div className="minmax-temperature">
                    <Temperature value={forecast.temperature.minimum} />
                    <span className="seperator">-</span>
                    <Temperature value={forecast.temperature.maximum} shouldRenderIndicatorIcon />
                </div>
            </article>
        </>
    )
}


type Props = {
    forecast: Forecast
    shouldRenderIcon: boolean
}