export type LocationForecastResponse = {
    Headline: {
        EffectiveDate: string
    }
    DailyForecasts: Forecast[]
}


type Forecast = {
    Date: string
    Day: {
        Icon: number
        IconPhrase: string
    },
    Night: {
        Icon: number
        IconPhrase: string
    },
    Temperature: {
        Minimum: {
            Value: number
        }
        Maximum: {
            Value: number
        }
    }
}