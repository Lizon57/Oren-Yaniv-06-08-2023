export const ConvertTemperatureUnit = (value: number, isFahrenheitToCelsius = true) => {
    if (isFahrenheitToCelsius) return (value - 32) * (5 / 9)
    return (value * 9 / 5) + 32
}