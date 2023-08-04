import { Icon } from "@/cmps/common/icon/icon"
import { Forecast } from "@/models/forecast"


export function ForecastPreview({ forecast, shouldRenderIcon }: Props) {
    return (
        <>
            <article className="homepage--forecast-preview__container">
                <span className="day-name">{forecast.dayName}</span>

                <img src={`https://developer.accuweather.com/sites/default/files/${forecast.day.icon}-s.png`} />

                <div className="day-textual">
                    {shouldRenderIcon && <Icon name="sun-outline" size="20" />}
                    {forecast.day.text}
                </div>

                <div className="night-textual">
                    {shouldRenderIcon && <Icon name="moon-full" size="20" />}
                    {forecast.night.text}
                </div>

                <div className="minmax-temperature">
                    <span className="minimum">{forecast.temperature.minimum.celsius}</span>
                    <span className="seperator">-</span>
                    <span className="maximum">{forecast.temperature.maximum.celsius}</span>
                    <span className="seperator"></span>
                    <Icon name="celsius-sign" size="20" />
                </div>
            </article>
        </>
    )
}


type Props = {
    forecast: Forecast
    shouldRenderIcon: boolean
}