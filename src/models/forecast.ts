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
    temperature: {
        minimum: {
            fahrenheit: number
            celsius: number
        }
        maximum: {
            fahrenheit: number
            celsius: number
        }
    }
}