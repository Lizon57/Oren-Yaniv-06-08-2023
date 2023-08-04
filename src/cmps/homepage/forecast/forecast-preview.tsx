import { RootState } from "@/store/store"
import { useSelector } from "react-redux"

import { ConvertTemperatureUnit } from "@/services/util/convert-temperatur-unit"
import { Forecast } from "@/models/forecast"

import { Icon } from "@/cmps/common/icon/icon"


export function ForecastPreview({ forecast, shouldRenderIcon }: Props) {
    const isCelsiusPreffer = useSelector((state: RootState) => state.appModule.isCelsiusPreffer)

    const minimumTempCelsius = forecast.temperature.minimum.celsius
    const minimumTempDisplay = isCelsiusPreffer ? minimumTempCelsius : ConvertTemperatureUnit(minimumTempCelsius, false)

    const maximumTempCelsius = forecast.temperature.maximum.celsius
    const maximumTempDisplay = isCelsiusPreffer ? maximumTempCelsius : ConvertTemperatureUnit(maximumTempCelsius, false)


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
                    <span className="minimum">{minimumTempDisplay}</span>
                    <span className="seperator">-</span>
                    <span className="maximum">{maximumTempDisplay}</span>
                    <span className="seperator"></span>

                    {isCelsiusPreffer
                        ? <Icon name="celsius-sign" size="20" />
                        : <Icon name="fahrenheit-sign" size="20" />
                    }
                </div>
            </article>
        </>
    )
}


type Props = {
    forecast: Forecast
    shouldRenderIcon: boolean
}