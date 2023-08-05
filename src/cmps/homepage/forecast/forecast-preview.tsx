import { Forecast } from "@/models/forecast/forecast"

import { Icon } from "@/cmps/common/icon/icon"
import { Temperature } from "@/cmps/common/temperature/temperature"


export function ForecastPreview({ forecast, shouldRenderIcon }: Props) {
    return (
        <>
            <article className="homepage--forecast-preview__container">
                <span className="day-name">{forecast.dayName}</span>

                <img src={`https://developer.accuweather.com/sites/default/files/${forecast.day.icon}-s.png`} />

                <div className="day-textual">
                    {shouldRenderIcon && <Icon name="sun-outline" size="20px" />}
                    {forecast.day.text}
                </div>

                <div className="night-textual">
                    {shouldRenderIcon && <Icon name="moon-full" size="20px" />}
                    {forecast.night.text}
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