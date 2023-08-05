export type Forecast = {
    dayName: string
    day: {
        icon: string
        text: string
    }
    night: {
        icon: string
        text: string
    }
    temp: {
        minimum: number
        maximum: number
    }
}