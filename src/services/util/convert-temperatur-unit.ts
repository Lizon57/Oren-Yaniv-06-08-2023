export const convertTemperatureUnit = (value: number, isFahrenheitToCelsius = true) => {
    if (isFahrenheitToCelsius) return +((value - 32) * (5 / 9)).toFixed(0)
    return +((value * 9 / 5) + 32).toFixed(0)
}