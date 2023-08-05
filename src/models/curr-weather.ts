export type CurrWeather = {
    effectiveDate: number
    weather: {
        icon: string
        text: string
        celsiusTemp: number
    }
}