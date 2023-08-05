export type CurrWeatherResponse = {
    LocalObservationDateTime: string
    WeatherIcon: number
    WeatherText: string
    Temperature: {
        Imperial: {
            Value: number
        }
        Metric: {
            Value: number
        }
    }
}[]